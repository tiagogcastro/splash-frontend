import Button from '@components/Button';
import Header from '@components/Header';

import styles from '@styles/pages/signUpTelefone.module.scss';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import api from 'src/services/api';
import { withSSRGuest } from 'src/utils/withSSRGuest';

export default function LoginPhone() {
  const router = useRouter()
  const {signIn} = useAuth()

  const [userPhone, setUserPhone] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await signIn({
      phone_number: `55${userPhone}`,
      password
    })
    
    router.push('/dashboard')
  }
  
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
        <Header text="Login" />

        <span>Informe seu número de telefone</span>

          <div className={styles.inputs}>
            <div>
              <h4>BR +55</h4>
              <hr />
              <input type="tel" placeholder="Numero do telefone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
            </div>
          </div>
          <div className={styles.passwordInput}>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button type="submit">Entrar</Button>
      </form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})