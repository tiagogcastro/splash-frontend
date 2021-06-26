import * as yup from 'yup'
import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import styles from '@styles/pages/signUpVerification.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import api from 'src/services/api';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRGuest } from 'src/utils/withSSRGuest';

interface ISignUpFormData {
  terms: boolean,
  sponsorship_code: string,
  phone_number: string,
  verification_code: string,
  password: string,
}
export default function signUpVerification() {
  const router = useRouter()
  const {sponsorship_code, phoneNumber} = router.query
  const {saveOnCookies} = useAuth()
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null)


  const handleSubmit = useCallback(
    async (data: ISignUpFormData) => {
      try{
        setLoading(true)

        const schema = yup.object().shape({
          verification_code: yup.string().min(6 ,'Mínimo de 6 caracteres').max(6 ,'Máximo de 6 caracteres'),
          password: yup.string().min(8 ,'Mínimo de 8 caracteres').max(100 ,'Máximo de 100 caracteres'),
        })

        await schema.validate(data, {
          abortEarly: false
        });

        const { verification_code, password } = data

        console.log(phoneNumber);

        const response = await api.post(`/users/sms`, {
          terms: true,
          sponsorship_code,
          phone_number: phoneNumber,
          verification_code,
          password,
        })

      saveOnCookies(response.data)

      router.push('/dashboard')
    } catch(error) {
      if(error instanceof yup.ValidationError){
        const errors = getValidationErrors(error)

        formRef.current.setErrors(errors)

        return
      }
      formRef.current.setFieldError('password', 'Seu código de verificação é inválido')
    } finally {
      setLoading(false)
    }
    },
    [router, api, saveOnCookies],
  )

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit} className={styles.container}>
        <Header text="Verificação"></Header>

          <span>Para finalizar, insira o código de verificação e sua senha</span>

          <Input
            type="text"
            name="verification_code"
            placeholder="Código de verificação"
          />

          <Input
            type="password"
            name="password"
            placeholder="Definir senha"
          />

          <Button type="submit" isLoading={loading} className={styles.confirm}>Confirmar</Button>
      </Form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
