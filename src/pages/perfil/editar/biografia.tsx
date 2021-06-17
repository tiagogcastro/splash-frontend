import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import api from 'src/services/api';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  newBio?: string
}

export default function Biografia({ bio }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [newBio, setNewBio] = useState(bio)

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleEditProfile() {

    try {

      const schema = yup.object().shape({
        newBio: yup.string().max(200, "Máximo de 200 caracteres")
      });
    
      const data = {
        newBio
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put('/profile', {
        bio: newBio
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
    }

  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar biografia" />
        <div className={styles.content}>
          <div className={utilStyles.field}>
            <label htmlFor="bio">Biografia</label>
            <textarea name="bio" placeholder="Insira sua biografia..." value={newBio} onChange={(e) => setNewBio(e.target.value)} />
            { errors.newBio && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.newBio}</div> }

          </div>
          <div className={styles.buttonConfirmation}>
            <Button onClick={handleEditProfile} >Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  let bio = query.bio

  if (bio === 'null') {
    bio = ''
  }

  return {
    props: {
      bio
    }
  }
})