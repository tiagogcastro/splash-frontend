import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';

export default function EditNotRegister() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar perfil" />
        <div className={styles.content}>
          <div className={styles.useredit}>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="name">Nome</label>
                <input type="text" name="name" placeholder="Insira seu nome..."/>
              </div>
              <div className={styles.field}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Insira seu username..."/>
              </div>
            </div>
            <Button>Confirmar</Button>
          </div>

          <div className={styles.notRegister}>
            <p>Me parece que você não tem uma senha e e-mail registrado, deseja adicionar?</p>
            <Button>Adicionar e-mail e senha</Button>
          </div>
        </div>
      </div>
    </>
  )
}
