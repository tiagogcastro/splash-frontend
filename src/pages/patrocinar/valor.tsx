import styles from '@styles/pages/patrocinar/valor.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import api from 'src/services/api';
import yup from 'yup';

export default function PatrocinarValor() {
  const route = useRouter();
  const [value, setValue] = useState(1);

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
  // Falta fazer funcionar o value pra enviar o valor vindo do input
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    try {
      const schema = yup.object().shape({
        amount: yup.number().required("Valor obrigatório")
      });

      api.post('/sponsorships', {
        user_recipient_id: route.query.user_id || null,
        allow_withdrawal_balance: true,
        amount: value
      });

      const data = {
        amount: value
      }
      
      await schema.validate(data, {
        abortEarly: false,
      });
      
      route.push('/dashboard')
    } catch(e) {}
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
              <div className={styles.alert}>
                * valor máximo de R$ 500
              </div>
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
