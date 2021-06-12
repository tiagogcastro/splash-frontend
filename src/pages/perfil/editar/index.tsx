import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';
import { useAuth } from 'src/hooks/useAuth';
import { useState } from 'react';
import { FiChevronRight  } from 'react-icons/fi'
import { AiOutlineCamera  } from 'react-icons/ai'
import api from 'src/services/api';

export default function Editar() {
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
            <div className={styles.avatar}>
              <AiOutlineCamera className={styles.icon} size={30} color="#ffffff" />
              <img src="/logo.png" alt="Avatar" />
            </div>
            <div className={styles.field}>
              <p>Nome</p>
              <a href="/perfil/editar/nome">
                {user.name}
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Nome de usuário</p>
              <a href="/perfil/editar/username">
                {user.username}
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Email</p>
              <a href="/perfil/editar/email">
                {user.email}
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Senha</p>
              <a href="/perfil/editar/senha">
                ********
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Biografia</p>
              <a href="/perfil/editar/biografia">
                Editar biografia
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
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
