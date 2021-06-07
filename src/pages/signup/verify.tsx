import Button from '@components/Button';
import Header from '@components/Header';

import styles from '@styles/pages/signUpVerification.module.scss';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import api from 'src/services/api';

export default function signUpVerification() {
  const router = useRouter()
  
  async function handleSendVerificationCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // await api.post('/users/sms/sendcode')

    router.push('/dashboard')
  }
  
  return (
    <>
      <form onSubmit={(e) => handleSendVerificationCode(e)} className={styles.container}>
        <Header text="Verificação" returnPage="/loginNumber"></Header>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <div className={styles.inputs}>
            <input type="text" placeholder="Código"/>
          </div>

          <Button type="submit" className={styles.confirm}>Confirmar</Button>
      </form>
    </>
  )
}
