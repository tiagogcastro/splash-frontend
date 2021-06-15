import Header from '@components/Header';
import Button from '@components/Button';
import utilStyles from '@styles/utilStyles.module.scss';

import styles from '@styles/pages/perfil/editar.module.scss';
import { FormEvent, useState } from 'react';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { GetServerSideProps } from 'next';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  email?: string
  password?: string 
  invalid?: string
  notMatch?: string
}

export default function RegisterEmail() {
  const {saveOnCookies} = useAuth()
  const router = useRouter()
  const {user} = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  
      try {
        const schema = yup.object().shape({
          email: yup.string().email("Digite um email válido").required("Email Obrigatório"),
          password: yup.string().min(8, "Mínimo de 8 caracteres").max(100, "Máximo de 100 caracteres").required("Senha obrigatória")
        });

        if (password !== confirmPassword) {
          throw Error("As senhas não coincidem")
        }

        const data = {
          email,
          password
        }

        await schema.validate(data, {
          abortEarly: false,
        });

            const response = await api.put('/profile/add-email', {
        email,
        password,
        password_confirmation: confirmPassword
        })

        saveOnCookies(response.data)

        router.push(`/${user.username}`)
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errs = getValidationErrors(err)

          console.log(errs)
  
          setErrors(errs)
  
          return;
        } else {
          setErrors({
            notMatch: "As senhas não coincidem"
          })
        }
      }
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Registro de e-mail e senha" />
        <form className={styles.content} onSubmit={(e) => { handleSubmit(e) }}>
          <div className={styles.fields}>
            <div className={utilStyles.field}>
              <label htmlFor="email">E-mail</label>
              <input type="email" required name="email" placeholder="Insira seu email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
              { errors.email && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.email}</div> }
            </div>
            <div className={utilStyles.field}>
              <label htmlFor="password">Senha</label>
              <input type="password" required name="password" placeholder="Insira sua senha..." value={password} onChange={(e) => setPassword(e.target.value)}/>
              { errors.password && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.password}</div> }
            </div>

            <div className={utilStyles.field}>
              <label htmlFor="passwordconfirmation">Confirmar senha</label>
              <input type="password" required name="passwordconfirmation" placeholder="Confirme sua senha..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              { errors.invalid && <div className={[styles.alert, styles.visible].join(" ")}>{errors.invalid}</div> }
              { errors.notMatch && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.notMatch}</div> }
            </div>
          </div>

          <div className={styles.buttonConfirmation}>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})