import Button from '@components/Button';
import Input from '@components/Input';
import styles from '@styles/pages/loginEmail.module.scss';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRGuest } from 'src/utils/withSSRGuest';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useAuth';

interface ILogInFormData {
  email: string
  password: string
}

export default function LoginEmail() {
  const router = useRouter()
  const { signIn } = useAuth()

  const [ loading, setLoading ] = useState<boolean>(false);

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async ({
      email,
      password
    }: ILogInFormData) => {
      try {
        setLoading(true)
        const schema = yup.object().shape({
          email: yup
            .string()
            .email("Digite um email válido")
            .required("Email obrigatório"),
          password: yup
            .string()
            .min(8, "Mínimo de 8 caracteres")
            .max(100, "Máximo de 100 caracteres").required("Senha obrigatória")
        });

        await schema.validate({
          email,
          password
        }, {
          abortEarly: false,
        });

        await signIn({
          email,
          password
        })

        router.push('/')
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          formRef.current.setErrors(errs)

          return;
        }
        formRef.current.setErrors({ password: 'E-mail ou senha não estão corretos' })

      } finally {
        setLoading(false)
      }
    },
    []
  )

  return (
    <>
      <Form ref={formRef} className={styles.container} onSubmit={handleSubmit}>
          <div className={styles.avatar}>
            <img src="/logo.png" alt="Logo" />
          </div>

          <span>Informe seu email e senha</span>

          <div className={styles.inputs}>
            <div className={styles.field}>
              <Input
                name="email"
                type="email"
                placeholder="Digite seu E-mail"
              />
            </div>
            <div className={styles.field}>
              <Input
                name="password"
                type="password"
                placeholder="Digite sua Senha"
              />
            </div>
          </div>

          <Button type="submit" isLoading={loading}>Entrar</Button>
      </Form>

      <div className={styles.links}>
        <span>Ainda não tem uma conta?</span>
        <Link href="/signup">
          Cadastrar-se
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
