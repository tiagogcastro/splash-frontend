import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function Name({ name }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [newName, setNewName] = useState(name)

  async function handleEditProfile() {
    const response = await api.put('/profile', {
      name: newName
    })

    saveOnCookies({ user: response.data })

    router.back()
  }

  return (
    <div className={styles.container}>
      <Header text="Editar nome" />
      <div className={styles.content}>
        <div className={styles.field}>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" placeholder="Insira seu nome..." value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div className={styles.buttonConfirmation}>
          <Button onClick={handleEditProfile} >Confirmar</Button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  const name = query.name

  return {
    props: {
      name
    }
  }
})