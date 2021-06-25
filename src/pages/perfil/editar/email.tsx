import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { GetServerSideProps } from 'next';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Form } from '@unform/web';
import api from 'src/services/api';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import Input from '@components/Input';

interface IProfileFormData {
  email: string
}

export default function Email({ email, token }) {
  const { saveOnCookies } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async ({ email }: IProfileFormData) => {
      setIsLoading(true)
      try {

        const schema = yup.object().shape({
          email: yup.string().email("Digite um email válido").required("Email Obrigatório"),
        });

        await schema.validate({
          email,
        }, {
          abortEarly: false,
        });

        const response = await api.put('/profile', {
          email,
          token
        })

        saveOnCookies({ user: response.data })

        router.back()
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return;
        }

        formRef.current.setFieldError('email', 'Não foi possível atualizar seu e-mail')
      }finally {
        setIsLoading(false)
      }
    },
    [],
  )

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar e-mail" />

        <div className={styles.content}>
          <Form onSubmit={handleSubmit} ref={formRef} className={utilStyles.field} style={{height: '100%'}}>
            <label htmlFor="email">E-mail</label>
            <Input
              name="email"
              placeholder="Insira seu e-mail..."
            />

            <div className={styles.buttonConfirmation} style={{marginTop: "50vh"}}>
              <Button isLoading={isLoading} type="submit">Confirmar</Button>
            </div>

          </Form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  const email = query.email
  const token = query.token

  return {
    props: {
      email,
      token
    }
  }
})
