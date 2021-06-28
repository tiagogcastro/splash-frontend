import Button from '@components/Button';
import Header from '@components/Header';

import styles from '@styles/pages/signUpTelefone.module.scss';
import utilStyles from '@styles/utilStyles.module.scss'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRGuest } from 'src/utils/withSSRGuest';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  phone_number?: string
  password?: string 
  invalid?: string
}

export default function LoginPhone() {
  const router = useRouter()
  const {signIn} = useAuth()

  const [userPhone, setUserPhone] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

      const schema = yup.object().shape({
        userPhone: yup.string().matches(phoneRegEx, 'Formato inválido').required("Telefone obrigatório"),
        password: yup.string().required("Senha obrigatória").min(8, "Mínimo de 8 caracteres").max(100, "Máximo de 100 caracteres")
      });
    
      const data = {
        userPhone,
        password
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        phone_number: `+55${userPhone}`,
        password
      })
  
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs = getValidationErrors(err)

        setErrors(errs)

        return;
      }
      setErrors({invalid: 'Telefone ou senha não estão corretos'})
    }
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
              { errors.phone_number && <div className={[styles.alert, styles.visible].join(" ")}>{ errors.phone_number }</div> }
            </div>
          </div>
          <div className={utilStyles.field}>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            { errors.password && <div className={[utilStyles.alert, utilStyles.visible].join(" ")}>{ errors.password }</div> }
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
