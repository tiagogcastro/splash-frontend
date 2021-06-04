import Header from '@components/Header';
import Button from '@components/Button';

import styles from '@styles/pages/edit.module.scss';

export default function Edit() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Editar perfil" returnPage="/me" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="name">Nome</label>
              <input type="text" name="name" placeholder="Insira seu nome..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Insira seu username..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" placeholder="Insira seu email..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="oldpassword">Senha antiga</label>
              <input type="password" name="oldpassword" placeholder="Insira sua senha antiga..."/>
            </div>
            <div className={styles.field}>
              <label htmlFor="newpassword">Nova senha</label>
              <input type="password" name="newpassword" placeholder="Insira sua nova senha..."/>
            </div>

            <div className={styles.field}>
              <label htmlFor="passwordconfirmation">Confirmação de senha</label>
              <input type="password" name="passwordconfirmation" placeholder="Confirme sua senha..."/>
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
