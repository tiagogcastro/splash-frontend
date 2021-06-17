import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from 'src/services/api';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  password?: string,
  oldPassword?: string,
  confirmPassword?: string
}

export default function Password() {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleEditProfile() {

    try {

      const schema = yup.object().shape({
        oldPassword: yup.string().min(8, "Mínimo de 8 caracteres").max(100, "Máximo de 100 caracteres").required("Nova senha obrigatória"),
        password: yup.string().required("Senha antiga obrigatória"),
        confirmPassword: yup.string().required("Confirmação de senha obrigatória")
      });

      if (password !== confirmPassword) {
        throw Error("As senhas não coincidem")
      }
    
      const data = {
        password,
        oldPassword,
        confirmPassword
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put('/profile', {
        password,
        old_password: oldPassword,
        password_confirmation: confirmPassword
      })
  
      saveOnCookies({ user: response.data })
  
      router.back()

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs = getValidationErrors(err)

        console.log(errs)

        setErrors(errs)

        return;
      } else {
        setErrors({ confirmPassword: "Senhas não coincidem" })
      }
    }

    
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar senha" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={utilStyles.field}>
              <label htmlFor="password">Senha antiga</label>
              <input type="password" name="password" placeholder="Sua antiga senha..." value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                { errors.oldPassword && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.oldPassword}</div> }
            </div>
            <div className={utilStyles.field}>
              <label htmlFor="password-new">Nova senha</label>
              <input type="password" name="password-new" placeholder="Sua nova senha..." value={password} onChange={(e) => setPassword(e.target.value)} />
              { errors.password && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.password}</div> }
            </div>
            <div className={utilStyles.field}>
              <label htmlFor="password-confirmation">Confirmar senha</label>
              <input type="password" name="password-confirmation" placeholder="Confirmação da senha..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              { errors.confirmPassword && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.confirmPassword}</div> }
            </div>
          </div>
          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile} >Confirmar</Button>
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