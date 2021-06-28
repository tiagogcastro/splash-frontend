import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/useAuth';
import api from 'src/services/api';

import styles from '@styles/pages/perfil/editar.verify.module.scss';

export default function VerifycationTokenEmail() {
  const router = useRouter()
  const {user, signOut} = useAuth()

  const [ isLoading, setIsLoading ] = useState(false);
  
  async function verifycationToken() {
    try {
      setIsLoading(true);
      const { token } = router.query;

      console.log(token)

      await api.put('/profile', {
        token
      })

      setIsLoading(false)
      signOut()      
      router.push('/login/email')
      
    } catch(err) {
      console.log(`Erro aqui ${err}`)
      setIsLoading(false)
    }
  } 

  useEffect(() => {
    verifycationToken()
  }, [])
 
 
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src="/logo.png" alt="Logo" />
      </div>

      <p>Estamos validando seu email...</p>

      <div>
        {isLoading ? (
          <h1>spinner</h1>
        ): (
          <h1></h1>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (async (ctx) => {

  return {
    props: {

    }
  }
})