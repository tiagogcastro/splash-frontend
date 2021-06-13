import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import { GetServerSideProps } from 'next';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from 'src/services/api';

export default function Email({ email }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [newEmail, setNewEmail] = useState(email)

  async function handleEditProfile() {
    const response = await api.put('/profile', {
      email: newEmail
    })

    saveOnCookies({ user: response.data })

    router.back()
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar e-mail" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" placeholder="Insira seu e-mail..."/>
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
  const email = query.email

  return {
    props: {
      email
    }
  }
}