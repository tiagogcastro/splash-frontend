import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';

export default function Edit() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar nome" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="name">Nome</label>
            <input type="text" name="name" placeholder="Insira seu nome..."/>
          </div>
          <div className={styles.buttonConfirmation}>
            <Button>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
