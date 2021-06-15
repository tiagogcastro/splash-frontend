import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';
import { useState } from 'react';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { GetServerSideProps } from 'next';

export default function RegisterEmail() {
  const {saveOnCookies} = useAuth()
  const router = useRouter()
  const {user} = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleEditProfile() {
    const response = await api.put('/profile/add-email', {
      email,
      password,
      password_confirmation: confirmPassword
    })

    saveOnCookies(response.data)
    
    router.push(`/${user.username}`)
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Registro de e-mail e senha" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" placeholder="Insira seu email..." value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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