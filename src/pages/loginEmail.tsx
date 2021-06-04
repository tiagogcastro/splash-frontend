import Button from '@components/Button';

import styles from '@styles/pages/loginEmail.module.scss';

export default function LoginEmail() {
  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}></div>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>
          
          <div className={styles.inputs}>
            <input type="text" placeholder="Digite seu E-mail"/>
            <input type="text" placeholder="Digite sua Senha"/>
          </div>
          
          <Button>Entrar</Button>
      </div>

      <div className={styles.links}>
        <span>Ainda não tem uma conta?</span>
        <h3>Cadastrar-se</h3>
      </div>
    </>
  )
}
