import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';

export default function Email() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar e-mail" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" placeholder="Insira seu e-mail..."/>
          </div>
          <div className={styles.buttonConfirmation}>
            <Button>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
