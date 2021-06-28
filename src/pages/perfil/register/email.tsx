import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import styles from '@styles/pages/perfil/editar.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import { useCallback, useRef, useState } from 'react';
import api from 'src/services/api';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import * as yup from 'yup';



interface IProfileFormData {
  email: string
}

export default function RegisterEmail() {
  const formRef = useRef<FormHandles>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = useCallback(
    async ({ email }: IProfileFormData) => {
      try {
        setLoading(true)
        formRef.current.setErrors({})

        const schema = yup.object().shape({
          email: yup.string().email("Digite um email válido").required("Email obrigatório"),
        });

        await schema.validate({
          email
        }, {
          abortEarly: false,
        });

        await api.post('/profile/send-verification-token', {
          email,
        })

        setSuccess(true)
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          formRef.current.setErrors(errs)

          return;
        }
        formRef.current.setFieldError('email', 'Não foi possível atualizar seu e-mail')
      } finally {
        setLoading(false)
      }
    },
  [api])

  return (
    <>
      <div className={styles.container}>
        <Header text="Registro de e-mail" />

        <Form onSubmit={handleSubmit} ref={formRef} className={styles.content} >
          <div className={styles.fields}>
            <div className={utilStyles.field}>
              <label htmlFor="email">E-mail</label>
              <Input
                type="text"
                name="email"
                placeholder="Insira seu email..."
              />
              {success && <p className={utilStyles.success}>Um e-mail de confirmação foi enviado para sua caixa de entrada</p>}

            </div>
          </div>
          <div className={styles.buttonConfirmation}>
            <Button type="submit" isLoading={loading}>Adicionar</Button>
          </div>
        </Form>

      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
