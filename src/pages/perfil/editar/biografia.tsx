import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from 'src/services/api';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function Biografia({ bio }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [newBio, setNewBio] = useState(bio)

  async function handleEditProfile() {
    const response = await api.put('/profile', {
      bio: newBio
    })

    saveOnCookies({ user: response.data })

    router.back()
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar biografia" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="bio">Biografia</label>
            <textarea name="bio" placeholder="Insira sua biografia..." value={newBio} onChange={(e) => setNewBio(e.target.value)} />
          </div>
          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile} >Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  let bio = query.bio

  if (bio === 'null') {
    bio = ''
  }

  return {
    props: {
      bio
    }
  }
})