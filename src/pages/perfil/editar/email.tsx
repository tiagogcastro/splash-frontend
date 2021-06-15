import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import { GetServerSideProps } from 'next';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from 'src/services/api';

export default function Email({ email, token }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [newEmail, setNewEmail] = useState(email)
  const [messageVisible, setMessageVisible] = useState(false)

  async function handleEditProfile() {
    try {
      const response = await api.put('/profile', {
        email: newEmail,
        token
      })
  
      saveOnCookies({ user: response.data })
  
      router.back()
    } catch {
      setMessageVisible(true)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar e-mail" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Insira seu e-mail..."
              value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            { messageVisible && <p>Um E-mail foi enviado para {newEmail}, confirme ele em até 12 horas.</p> }
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
  const token = query.token

  return {
    props: {
      email,
      token
    }
  }
}