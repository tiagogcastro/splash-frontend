import styles from '@styles/pages/patrocinar/valor.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'
import { useState, useEffect } from 'react';

export default function Home() {

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

  const [value, setValue] = useState(1);

  return (
    <div className={styles.container}>
        <Header text="Enviar patrocínio" returnPage="/"/>
        <div className={styles.content}>
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
                        pattern="[0-9]"
                      />
                      <div className={styles.alert}>
                        * valor máximo de R$ 500
                      </div>
                    </div>
                    
                </div>
            </div>
            
            <div className={styles.buttonConfirmation}>
              <Button url="/">Continuar</Button>
            </div>
        </div>
    </div>
  )
}
