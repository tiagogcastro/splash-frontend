import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { useState } from 'react';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { GetServerSideProps } from 'next';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  email?: string
  password?: string,
  confirmPassword?: string
}

export default function RegisterEmail() {
  const {saveOnCookies} = useAuth()
  const router = useRouter()
  const {user} = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleEditProfile() {

    try {

      const schema = yup.object().shape({
        name: yup.string(),
        password: yup.string().required("Senha obrigatória").min(8, "Mínimo de 8 caracteres").max(100, "Máximo de 100 caracteres"),
        confirmPassword: yup.string().required("Confirmar senha obrigatório").min(8, "Mínimo de 5 caracteres").max(100, "Máximo de 100 caracteres")
      });
    
      const data = {
        email,
        password,
        confirmPassword
      }

      if (password !== confirmPassword) {
        throw Error("Senhas não coincidem")
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put('/profile/add-email', {
        email,
        password,
        confirmPassword
      })
  
      saveOnCookies(response.data)
      
      router.push(`/${user.username}`)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs = getValidationErrors(err)

        setErrors(errs)

        console.log(errors)

        return;
      }
    }

    
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Registro de e-mail e senha" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={utilStyles.field}>
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                name="email"
                placeholder="Insira seu email..."
                value={email} onChange={(e) => setEmail(e.target.value)} />
                { errors.email && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{ errors.email }</div> }

            </div>
            <div className={utilStyles.field} >
              <label htmlFor="password-new">Senha</label>
              <input
                type="password" 
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                { errors.password && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{ errors.password }</div> }

            </div>
            <div className={utilStyles.field} > 
              <label htmlFor="password-confirmation" >Comfirmar senha</label>
              <input
                type="password" 
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />
                { errors.confirmPassword && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{ errors.confirmPassword }</div> }

            </div>
          </div>

          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile}>Adicionar</Button>
          </div>
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