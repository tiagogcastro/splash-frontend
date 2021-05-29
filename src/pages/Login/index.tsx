import Button from '../../components/Button';

import styles from '../../styles/pages/login.module.scss';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}></div>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <input type="text" placeholder="Insira seu código de patrocínio"/>

          <Button>Continue com WhatsApp</Button>
          <Button>Use e-mail ou nome de usuario</Button>
      </div>

      <div className={styles.links}>
        <span>Ainda não tem uma conta?</span>
        <h3>Cadastrar-se</h3>
      </div>
    </>
  )
}
