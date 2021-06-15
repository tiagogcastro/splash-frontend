import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import api from 'src/services/api';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function Username({ username }) {
  const router = useRouter()
  const {saveOnCookies} = useAuth()

  const [newUsername, setNewUsername] = useState(username)

  async function handleEditProfile() {
    const response = await api.put('/profile', {
      username: newUsername
    })

    saveOnCookies({ user: response.data })

    router.back()
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar nome de usuário" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="username">Nome de usuário</label>
            <input type="text" name="username" placeholder="Insira seu nome de usuário..." value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </div>
          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  const username = query.username

  return {
    props: {
      username
    }
  }
})