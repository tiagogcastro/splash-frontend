import Button from '@components/Button';

import styles from '@styles/pages/login.module.scss';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { withSSRGuest } from 'src/utils/withSSRGuest';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="/logo.png" alt="Logo" />
          </div>

          <strong>Lavimco</strong>
          <span>
            Faça login ou crie uma conta para iniciar 
          </span>

          <Button url="/login/phone">Continue com WhatsApp</Button>
          <Button url="/login/email">Continue com E-mail</Button>
      </div>

      <div className={styles.links}>
        <span>Ainda não tem uma conta?</span>
        <Link href="/signup">
          <a>Cadastrar-se</a>
        </Link>
      </div>
      <footer className={styles.footer}>
        <strong>Lavimco Tecnologia Ltda</strong> 
        <p>
        Rua Sader Macul, nº 96, <strong>São Paulo/SP</strong> - CEP: 04543-907 | CNPJ: 35.576.012/0001-43
        </p>
      

      </footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})