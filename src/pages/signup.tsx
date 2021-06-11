import Button from '@components/Button';

import styles from '@styles/pages/signup.module.scss';
import Link from 'next/link';

export default function LoginNumber() {
  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="/logo.png" alt="Logo" />
          </div>

          <span><strong>Lavimco</strong><br/>Faça login ou crie uma conta para inicar </span>

          <input type="text" placeholder="Digite seu codigo de patrocinio"/>

          <Button url="/signup/phone">Continue com WhatsApp</Button>
      </div>

      <div className={styles.terms}>
        <input type="checkbox"/>
        <span>Eu concordo com os <strong>Termos e condições</strong></span>
      </div>

      <div className={styles.links}>
        <span>Já tem uma conta?</span>
        <Link href="/">
          <a>Login</a>
        </Link>
      </div>
    </>
  )
}
