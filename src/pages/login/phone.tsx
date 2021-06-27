import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import styles from '@styles/pages/signUpTelefone.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRGuest } from 'src/utils/withSSRGuest';
import * as yup from 'yup';

interface ILogInFormData {
  phone_number: string
  password: string
}

export default function LoginPhone() {
  const router = useRouter()
  const { signIn } = useAuth()
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async ({
      password,
      phone_number,
    }: ILogInFormData) => {
      try {
        setLoading(true)
        const phoneNumberFormated = phone_number.replaceAll(/[^\w\s]/gi, '').replace(' ', '')

        const schema = yup.object().shape({

          phone_number: yup
            .string()
            .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/g, 'Este telefone é inválido')
            .required("Por favor, preencha o campo acima"),

          password: yup
            .string()
            .required("Senha obrigatória")
            .min(8, "Mínimo de 8 caracteres")
            .max(100, "Máximo de 100 caracteres")

        });

        await schema.validate({
          password,
          phone_number
        }, {
          abortEarly: false,
        });

        await signIn({
          phone_number: `+55${phoneNumberFormated}`,
          password
        })

        router.push('/')
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          formRef.current.setErrors(errs)

          return;
        }
        formRef.current.setFieldError('password', 'Não foi possível realizar login')
      } finally {
        setLoading(false)
      }
    },
    [],
  )


  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit} className={styles.container}>
        <Header text="Login" />

        <span>Informe seu número de telefone</span>

          <div className={styles.inputs}>
            <div>
              <h4>BR +55</h4>
              <hr />
              <Input
                mask="(99) 99999-9999"
                name="phone_number"
                type="text"
                placeholder="Numero do telefone"
              />
            </div>
          </div>
          <div className={utilStyles.field}>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
            />
          </div>

          <Button isLoading={loading} type="submit">Entrar</Button>
      </Form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
