import styles from '@styles/pages/patrocinar/valor.module.scss'
import utilStyles from '@styles/utilStyles.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'
import { useState, useEffect } from 'react';

import * as yup from 'yup';
import getValidationErrors from 'src/utils/getValidationErrors';
import { FormEvent } from 'react';

type FormErrors = {
  valueOutOfRange?: string
}

export default function PatrocinarValor() {

  const [value, setValue] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({} as FormErrors)

  function setInputValue (e) {

    let v = parseInt(e.target.value);

    if (v > 0 || v) {
      if (v > 500) {
        setValue(value)
      } else {
        setValue(v)
      }
    }  else {
      setValue(0)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {

      const schema = yup.object().shape({
        phone_number: yup.string()
      });
    
      const data = {
        value
      }

      if (value < 1 || value > 500) {
        let valueOutOfRange = "O valor precisa estar entre R$ 1 e R$ 500";

        throw Error(valueOutOfRange);
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      // Ações

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
        <Header text="Enviar patrocínio"/>
        <form className={styles.content} onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.innerContent}>
                <div className={styles.value}>
                    <span>R$</span>
                    <div className={styles.input}>
                      <input 
                        onChange={(e) => {
                          setInputValue(e)
                        }} 
                        value={value} 
                        type="text"
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
