import Button from '@components/Button';

import styles from '@styles/pages/loginEmail.module.scss';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';
import {useAuth} from '../../hooks/useAuth'

export default function LoginEmail() {
  const router = useRouter()
  const {signIn, user} = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    await signIn({email, password})

    router.push('/dashboard')
  }
  
  return (
    <>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.avatar}></div>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>
          
          <div className={styles.inputs}>
            <input type="email" placeholder="Digite seu E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Digite sua Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <Button type="submit">Entrar</Button>
      </form>

      <div className={styles.links}>
        <span>Ainda não tem uma conta?</span>
        <a>Cadastrar-se</a>
      </div>
    </>
  )
}
