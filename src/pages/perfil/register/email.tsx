import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/editar.module.scss';

export default function RegisterEmail() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Registro de e-mail e senha" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" placeholder="Insira seu email..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Nova senha</label>
              <input type="password" name="password" placeholder="Insira sua senha..."/>
            </div>

            <div className={styles.field}>
              <label htmlFor="passwordconfirmation">Confirmação de senha</label>
              <input type="password" name="passwordconfirmation" placeholder="Confirme sua senha..."/>
            </div>
          </div>

          <div className={styles.buttonConfirmation}>
            <Button>Adicionar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
