import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { useState } from 'react';

export default function EditNotRegister() {
  const {user} = useAuth()

  console.log(user)
  
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)

  async function handleEditProfile() {
    const response = await api.put('/profile', {
      user_id: user.id,
      username,
      name
    })

    console.log(response.data)
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
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Insira seu nome..."/>
              </div>
              <div className={styles.field}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Insira seu username..."/>
              </div>
            </div>
            <Button onClick={handleEditProfile}>Confirmar</Button>
          </div>

          <div className={styles.notRegister}>
            <p>Me parece que você não tem uma senha e e-mail registrado, deseja adicionar?</p>
            <Button url="/perfil/registrar">Adicionar e-mail e senha</Button>
          </div>
        </div>
      </div>
    </>
  )
}
