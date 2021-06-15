import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  newName?: string
}

export default function Name({ name }) {
  const {saveOnCookies} = useAuth()
  const router = useRouter()

  const [newName, setNewName] = useState(name)

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleEditProfile() {

    try {

      const schema = yup.object().shape({
        newName: yup.string().max(30, "Máximo de 30 caracteres")
      });
    
      const data = {
        newName
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.put('/profile', {
        name: newName
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
    <div className={styles.container}>
      <Header text="Editar nome" />
      <div className={styles.content}>
        <div className={utilStyles.field}>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" placeholder="Insira seu nome..." value={newName} onChange={(e) => setNewName(e.target.value)} />
          { errors.newName && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{errors.newName}</div> }
        </div>
        <div className={styles.buttonConfirmation}>
          <Button onClick={handleEditProfile} >Confirmar</Button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ query }) => {
  const name = query.name

  return {
    props: {
      name
    }
  }
})