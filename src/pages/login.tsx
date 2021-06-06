import Button from '@components/Button';

import styles from '@styles/pages/login.module.scss';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}></div>

          <span>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit ut aliquam</span>

          <input type="text" placeholder="Insira seu código de patrocínio"/>

          <Button link="/loginNumber">Continue com WhatsApp</Button>
          <Button link="/loginEmail">Use e-mail ou nome de usuario</Button>
      </div>

      <div className={styles.links}>
        <span>Ainda não tem uma conta?</span>
        <Link href="/loginNumber">
          <a>Cadastrar-se</a>
        </Link>
      </div>
    </>
  )
}
