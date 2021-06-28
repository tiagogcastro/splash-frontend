import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import api from 'src/services/api';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '@components/Input';
import { useCallback } from 'react';

type FormErrors = {
  password?: string,
  oldPassword?: string,
  confirmPassword?: string
}

interface IProfileFormData{
  password: string
  password_confirmation: string

}
export default function Password() {
  const {saveOnCookies} = useAuth()
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async ({ password, password_confirmation }: IProfileFormData) => {
      try {
        setIsLoading(true)
        const schema = yup.object().shape({
          password: yup.string().min(8, 'O mínimo de caracteres é 8').max(100, 'O máximo de caracteres é 100'),
          password_confirmation: yup.string().oneOf(['password', yup.ref('password')], 'Senhas não coincidem').required('Confirmação de senha obrigatória')
        });


        await schema.validate({
          password,
          password_confirmation,
        }, {
          abortEarly: false,
        });

        const response = await api.put('/profile', {
          password,
          password_confirmation,
        })

        saveOnCookies({ user: response.data })

        router.back()

      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          formRef.current.setErrors(errs)

          return;
        }
        formRef.current.setFieldError("password_confirmation", "Não foi possível atualizar sua senha")
      } finally {
        setIsLoading(false)
      }

    },
  [])

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar senha" />
        <div className={styles.content}>
          <Form ref={formRef} onSubmit={handleSubmit} className={styles.fields}>
            <div className={utilStyles.field}>
              <label htmlFor="password">Nova senha</label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Sua nova senha..."
              />
            </div>
            <div className={utilStyles.field}>
              <label htmlFor="password_confirmation">Confirmar senha</label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Confirmação da senha..."
              />
            </div>
            <div className={styles.buttonConfirmation}>
              <Button type="submit" isLoading={isLoading}>Confirmar</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
