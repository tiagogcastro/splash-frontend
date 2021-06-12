import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';

export default function Username() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar nome de usuário" />
        <div className={styles.content}>
          <div className={styles.field}>
            <label htmlFor="username">Nome de usuário</label>
            <input type="text" name="username" placeholder="Insira seu nome de usuário..."/>
          </div>
          <div className={styles.buttonConfirmation}>
            <Button>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
