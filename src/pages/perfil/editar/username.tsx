import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import api from 'src/services/api';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/useAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  username?: string
}

export default function Username({ username }) {
  const router = useRouter()
  const {saveOnCookies} = useAuth()

  const [newUsername, setNewUsername] = useState(username)

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleEditProfile() {

    try {

      const schema = yup.object().shape({
        username: yup.string().min(5, "Mínimo de 5 caracteres").max(30, "Máximo de 30 caracteres")
      });
    
      const data = {
        username: newUsername
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put('/profile', {
        username: newUsername
      })
  
      saveOnCookies({ user: response.data })
  
      router.back()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs = getValidationErrors(err)

        console.log(errs)

        setErrors(errs)

        return;
      }
    }

    
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar nome de usuário" />
        <div className={styles.content}>
          <div className={utilStyles.field}>
            <label htmlFor="username">Nome de usuário</label>
            <input type="text" name="username" placeholder="Insira seu nome de usuário..." value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            { errors.username && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.username}</div> }
            
          </div>
          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const username = query.username

  return {
    props: {
      username
    }
  }
}