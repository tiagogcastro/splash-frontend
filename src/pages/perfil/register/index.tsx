import Button from '@components/Button';
import Header from '@components/Header';
import styles from '@styles/pages/perfil/editar.module.scss';
import utilStyles from '@styles/utilStyles.module.scss';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import api from 'src/services/api';
import getValidationErrors from 'src/utils/getValidationErrors';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import * as yup from 'yup';



type FormErrors = {
  name?: string
  username?: string
}

export default function EditNotRegister({ user }) {
  const [name, setName] = useState(user.name)

  const [username, setUsername] = useState(user.username)

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  async function handleEditProfile() {

    try {

      const schema = yup.object().shape({
        name: yup.string(),
        username: yup.string().required("Nome de usuário obrigatório").min(5, "Mínimo de 5 caracteres").max(30, "Máximo de 30 caracteres")
      });

      const data = {
        name,
        username
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put('/profile', {
        username,
        name
      })

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs = getValidationErrors(err)

        setErrors(errs)

        return;
      }
    }


  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar perfil" />
        <div className={styles.content}>
          <div className={styles.useredit}>
            <div className={styles.fields}>
              <div className={utilStyles.field}>
                <label htmlFor="name">Nome</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Insira seu nome..."/>
              </div>
              <div className={utilStyles.field}>
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Insira seu username..."/>
                { errors.username && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{ errors.username }</div> }

              </div>
            </div>
            <Button onClick={handleEditProfile}>Confirmar</Button>
          </div>

          <div className={styles.notRegister}>
            <p>Você não tem um e-mail registrado, deseja adicionar?</p>
            <Button url="/perfil/register/email">Adicionar e-mail</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const user = JSON.parse(parseCookies(ctx)["%40Lavimco%3Auser"])

  return {
    props: {
      user
    }
  }
})
