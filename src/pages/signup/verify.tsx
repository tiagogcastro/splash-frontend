import Button from '@components/Button';
import Header from '@components/Header';

import styles from '@styles/pages/signUpVerification.module.scss';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import api from 'src/services/api';
import { withSSRGuest } from 'src/utils/withSSRGuest';

export default function signUpVerification() {
  const router = useRouter()
  const {sponsorship_code, phoneNumber} = router.query
  const {saveOnCookies} = useAuth()
  
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  async function handleSendVerificationCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const response = await api.post(`/users/sms`, {
      verification_code: code,
      terms: true,
      sponsorship_code,
      password
    }, {
      params: {
        userPhone: `${phoneNumber}`
      }
    })

    saveOnCookies(response.data)

    router.push('/dashboard')
  }
  
  return (
    <>
      <form onSubmit={(e) => handleSendVerificationCode(e)} className={styles.container}>
        <Header text="Verificação"></Header>

          <span>Para finalizar, insira o código de verificação</span>

          <input type="text" placeholder="Código" value={code} onChange={(e) => setCode(e.target.value)}/>

          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button type="submit" className={styles.confirm}>Confirmar</Button>
      </form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})