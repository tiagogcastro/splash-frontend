import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import styles from '@styles/pages/perfil/editar.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useCallback, useRef, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import api from 'src/services/api';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import * as yup from 'yup';

interface IProfileFormData {
  name: string
  username: string
}

export default function EditNotRegister({ user }) {
  const formRef = useRef<FormHandles>(null)
  const { saveOnCookies } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(
    async ({ name, username }: IProfileFormData) => {
      try {
        setLoading(true)
        formRef.current.setErrors({})

        const schema = yup.object().shape({
          name: yup.string().required("Nome obrigatório"),
          username: yup.string().required("Nome de usuário obrigatório").min(5, "Mínimo de 5 caracteres").max(30, "Máximo de 30 caracteres")
        });

        const data = {
          name,
          username
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put('/profile', {
          username,
          name
        })

        saveOnCookies({user: response.data})

        router.push(`/${username}`)
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          formRef.current.setErrors(errs)

          return;
        }
        formRef.current.setFieldError('username', 'Não foi possível atualizar seus dados')
      } finally {
        setLoading(false)
      }

    },
    [])

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar perfil" />
        <div className={styles.content}>
          <Form ref={formRef} onSubmit={handleSubmit} className={styles.useredit}>
            <div className={styles.fields}>
              <div className={utilStyles.field}>
                <label htmlFor="name">Nome</label>
                <Input
                  defaultValue={user.name}
                  type="text"
                  name="name"
                  placeholder="Insira seu nome..."
                />
              </div>
              <div className={utilStyles.field}>
                <label htmlFor="username">Username</label>
                <Input
                  defaultValue={user.username}
                  type="text"
                  name="username"
                  placeholder="Insira seu username..."
                />

              </div>
            </div>
            <Button type="submit" isLoading={loading}>Confirmar</Button>
          </Form>

          <div className={styles.notRegister}>
            <p>Você não tem um e-mail registrado, deseja adicionar?</p>
            <Button url="/perfil/register/email">Adicionar e-mail</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const user = JSON.parse(parseCookies(ctx)["%40Lavimco%3Auser"])

  return {
    props: {
      user
    }
  }
})
