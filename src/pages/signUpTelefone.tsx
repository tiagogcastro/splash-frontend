import Button from '@components/Button';
import Header from '@components/Header';

import styles from '@styles/pages/signUpTelefone.module.scss';

export default function signUpTelefone() {
  return (
    <>
      <div className={styles.container}>
        <Header text="Login" returnPage="/loginNumber"></Header>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <div className={styles.inputs}>
            <h4>BR +</h4>
            <input type="number" defaultValue="55"/>
            <input type="text" placeholder="| Numero do telefone"/>
          </div>

          <Button url="/signUpVerification">Enviar Código</Button>
      </div>
    </>
  )
}
