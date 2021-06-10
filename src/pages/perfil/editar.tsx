import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';
import { useAuth } from 'src/hooks/useAuth';
import { useState } from 'react';
import api from 'src/services/api';

export default function Edit() {
  const {user} = useAuth();

  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleEditProfile() {
    await api.put('/profile', {
      user_id: user.id,
      username,
      name,
      email
    })
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar perfil" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="name">Nome</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Insira seu nome..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Insira seu username..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="email">E-mail</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Insira seu email..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="oldpassword">Senha antiga</label>
              <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" name="oldpassword" placeholder="Insira sua senha antiga..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="newpassword">Nova senha</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="newpassword" placeholder="Insira sua nova senha..."/>
            </div>

            <div className={styles.field}>
              <label htmlFor="passwordconfirmation">Confirmação de senha</label>
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="passwordconfirmation" placeholder="Confirme sua senha..."/>
            </div>
          </div>

          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
