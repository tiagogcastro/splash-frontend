import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from 'src/services/api';

export default function Password() {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleEditProfile() {
    const response = await api.put('/profile', {
      password,
      old_password: oldPassword,
      password_confirmation: confirmPassword
    })

    saveOnCookies({ user: response.data })

    router.back()
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar senha" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="password">Senha antiga</label>
              <input type="password" name="password" placeholder="Sua antiga senha..." value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label htmlFor="password-new">Nova senha</label>
              <input type="password" name="password-new" placeholder="Sua nova senha..." value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label htmlFor="password-confirmation">Confirmar senha</label>
              <input type="password" name="password-confirmation" placeholder="Confirmação da senha..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
