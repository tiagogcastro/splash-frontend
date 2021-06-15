import styles from '@styles/pages/patrocinar/valor.module.scss'
import utilStyles from '@styles/utilStyles.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from 'src/utils/withSSRAuth';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';

type FormErrors = {
  valueOutOfRange?: string
}

export default function PatrocinarValor() {
  const {user} = useAuth()
  const route = useRouter();
  const [value, setValue] = useState(1);

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  function setInputValue(e) {
    let v = parseInt(e.target.value);
    if (v > 0 || v) {
      if (v > 500) {
        setValue(value)
      } else {
        setValue(v)
      }
    } else {
      setValue(0)
    }
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
      
    try {
      const schema = yup.object().shape({
        value: yup.number().required("Valor obrigatório"),
        user_recipient_id: yup.string(),
      });

      const data = {
        value,
        user_recipient_id: ''
      }
        
       if (value < 1 || value > 500) {
        let valueOutOfRange = "O valor precisa estar entre R$ 1 e R$ 500";

        throw Error(valueOutOfRange);
       }

      await schema.validate(data, {
        abortEarly: false,
      });
      
        if(!data.user_recipient_id) {
        route.push(`/share?value=${value}`);
        return;
      }
      
      api.post('/sponsorships', {
        user_recipient_id: route.query.user_id || null,
        allow_withdrawal_balance: user.role === 'shop',
        amount: value
      });

      route.push('/dashboard');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs = getValidationErrors(err)

        setErrors(errs)

        console.log(errors)

        return;
      }
      setErrors({valueOutOfRange: err.message})
    }
  }

  return (
    <div className={styles.container}>
      <Header text="Enviar patrocínio" />
      <form className={styles.content} onSubmit={(event) => handleSubmit(event)}>
        <div className={styles.innerContent}>
          <div className={styles.value}>
            <span>R$</span>
            <div className={styles.input}>
              <input
                onChange={(e) => {
                  setInputValue(e)
                }}
                value={value}
                type="number"
                pattern="[0-9]"
              />
              { errors.valueOutOfRange && <div className={[styles.alert, styles.visible].join(" ")}>{ errors.valueOutOfRange }</div> }
            </div>

          </div>
        </div>

        <div className={styles.buttonConfirmation}>
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})