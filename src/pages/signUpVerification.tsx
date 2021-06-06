import Button from '@components/Button';
import Header from '@components/Header';

import styles from '@styles/pages/signUpVerification.module.scss';

export default function signUpVerification() {
  return (
    <>
      <div className={styles.container}>
        <Header text="Verificação" returnPage="/loginNumber"></Header>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <div className={styles.inputs}>
            <input type="text" placeholder="Código"/>
          </div>

          <Button className={styles.confirm}>Confirmar</Button>
      </div>
    </>
  )
}
