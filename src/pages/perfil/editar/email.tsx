import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { GetServerSideProps } from 'next';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from 'src/services/api';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  newEmail?: string
}

export default function Email({ email, token }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [newEmail, setNewEmail] = useState(email)
  const [messageVisible, setMessageVisible] = useState(false)

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleEditProfile() {

    try {

      const schema = yup.object().shape({
        newEmail: yup.string().email("Digite um email válido").required("Email Obrigatório"),
      });
    
      const data = {
        newEmail
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put('/profile', {
        email: newEmail,
        token
      })
  
      saveOnCookies({ user: response.data })
  
      router.back()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs = getValidationErrors(err)

        console.log(errs)

        setErrors(errs)

        return;
      }

      setMessageVisible(true)

    }
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar e-mail" />
        <div className={styles.content}>
          <div className={utilStyles.field}>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" placeholder="Insira seu e-mail..." value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            { errors.newEmail && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.newEmail}</div> }
            <input
              type="email"
              name="email"
              placeholder="Insira seu e-mail..."
              value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            { messageVisible && <p>Um E-mail foi enviado para {newEmail}, confirme ele em até 12 horas.</p> }
          </div>


          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile}>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  const email = query.email
  const token = query.token

  return {
    props: {
      email,
      token
    }
  }
})