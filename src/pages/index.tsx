import Button from '@components/Button';

import styles from '@styles/pages/login.module.scss';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="/logo.png" alt="Logo" />
          </div>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <input type="text" placeholder="Insira seu código de patrocínio"/>

          <Button url="/login/phone">Continue com WhatsApp</Button>
          <Button url="/login/email">Use e-mail ou nome de usuario</Button>
      </div>

      <div className={styles.links}>
        <span>Ainda não tem uma conta?</span>
        <Link href="/signup">
          <a>Cadastrar-se</a>
        </Link>
      </div>
    </>
  )
}
