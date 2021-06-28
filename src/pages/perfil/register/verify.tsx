import * as yup from 'yup'
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/useAuth';
import api from 'src/services/api';

import styles from '@styles/pages/perfil/editar.verify.module.scss';
import Loading from '@components/Loading';

export default function VerifycationTokenEmail() {
  const router = useRouter()
  const { signOut } = useAuth()

  const [ isLoading, setIsLoading ] = useState(false);

  async function verifycationToken() {
    try {
      setIsLoading(true);
      const { token } = router.query;

      const schema = yup.object().shape({
        token: yup.string().uuid()
      })

      await schema.validate({
        token
      }, {
        abortEarly: false
      })

      await api.put('/profile', {
        token
      })

      signOut()
      router.push('/login/email')

    } catch(err) {
      throw new Error('Failed to verify your email token')
    } finally {
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

      <div className={styles.loading}>
        {isLoading && <Loading size={48} />}
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
