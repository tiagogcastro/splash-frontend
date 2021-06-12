import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/perfil/each.module.scss';

export default function Password() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar senha" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="password">Senha antiga</label>
              <input type="password" name="password" placeholder="Sua antiga senha..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="password-new">Nova senha</label>
              <input type="password" name="password-new" placeholder="Sua nova senha..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="password-confirmation">Confirmar senha</label>
              <input type="password" name="password-confirmation" placeholder="Confirmação da senha..."/>
            </div>
          </div>
          <div className={styles.buttonConfirmation}>
            <Button>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  )
}
