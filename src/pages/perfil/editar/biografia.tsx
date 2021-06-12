import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';

export default function Biografia() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar biografia" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="bio">Biografia</label>
            <input type="text" name="bio" placeholder="Insira sua biografia..."/>
          </div>
          <div className={styles.buttonConfirmation}>
            <Button>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
