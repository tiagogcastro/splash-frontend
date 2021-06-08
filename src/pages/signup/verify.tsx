import Button from '@components/Button';
import Header from '@components/Header';

import styles from '@styles/pages/signUpVerification.module.scss';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import api from 'src/services/api';

export default function signUpVerification() {
  const router = useRouter()
  
  const [code, setCode] = useState('')

  async function handleSendVerificationCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await api.post(`/users/sms?userPhone=${router.query.phoneNumber}`, {
      code
    })

    router.push('/dashboard')
  }
  
  return (
    <>
      <form onSubmit={(e) => handleSendVerificationCode(e)} className={styles.container}>
        <Header text="Verificação"></Header>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <input type="text" placeholder="Código" value={code} onChange={(e) => setCode(e.target.value)}/>

          <Button type="submit" className={styles.confirm}>Confirmar</Button>
      </form>
    </>
  )
}
