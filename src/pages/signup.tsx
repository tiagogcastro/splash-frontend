import Button from '@components/Button';

import styles from '@styles/pages/loginNumber.module.scss';

export default function LoginNumber() {
  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}></div>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <div className={styles.inputs}>
            <input type="text" placeholder="DIgite seu codigo de patrocinio"/>
          </div>

          <Button url="/signup/phone">Continue com WhatsApp</Button>
      </div>

      <div className={styles.terms}>
        <input type="checkbox"/>
        <span>Eu concordo com os</span>
        <h3>Termos</h3>
        <span>e</span>
        <h3>Conditições</h3>
      </div>

      <div className={styles.links}>
        <span>Já tem uma conta?</span>
        <h3><a href="/">Login</a></h3>
      </div>
    </>
  )
}
