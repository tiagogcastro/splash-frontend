import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function EditNotRegister({ user }) {
  const router = useRouter()
  const {saveOnCookies} = useAuth()
  const {user} = useAuth()

  
  const [name, setName] = useState(user.name ? user.name : '')
  const [username, setUsername] = useState(user.username)

  async function handleEditProfile() {
    const response = await api.put('/profile', {
      username,
      name
    })

    saveOnCookies({ user: response.data })

    router.push(`/${username}`)
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar perfil" />
        <div className={styles.content}>
          <div className={styles.useredit}>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="name">Nome</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Insira seu nome..." />
              </div>
              <div className={styles.field}>
                <label htmlFor="username">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  placeholder="Insira seu username..." />
              </div>
            </div>
            <Button onClick={handleEditProfile}>Confirmar</Button>
          </div>

          <div className={styles.notRegister}>
            <p>Me parece que você não tem uma senha e e-mail registrado, deseja adicionar?</p>
            <Button url="/perfil/register/email">Adicionar e-mail e senha</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const user = JSON.parse(parseCookies(context)["%40Lavimco%3Auser"])

  return {
    props: {
      user,
    }
  }
})