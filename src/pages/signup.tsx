import Button from '@components/Button';

import styles from '@styles/pages/signup.module.scss';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { withSSRGuest } from 'src/utils/withSSRGuest';

export default function LoginNumber() {
  const [accepted, setAccepted] = useState(false)
  const [sponsorship_code, setSponsorship_code] = useState<string>()

  const router = useRouter();
  const sponsorship_code_params = String(router.query.sponsorship_code);
  
  setSponsorship_code(sponsorship_code_params);

  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="/logo.png" alt="Logo" />
          </div>

          <span><strong>Lavimco</strong><br/>Faça login ou crie uma conta para inicar </span>

          <input defaultValue={sponsorship_code_params} onChange={(e) => setSponsorship_code(e.target.value)} type="text" placeholder="Digite seu codigo de patrocinio"/>

          { accepted ? (
            <Button url={`/signup/phone?sponsorship_code=${sponsorship_code}`}>Continue com WhatsApp</Button>
          ) : (
            <Button>Aceite os termos para continuar</Button>
          ) }
      </div>

      <div className={styles.terms}>
        <input checked={accepted} type="checkbox" onChange={(e) => setAccepted(!accepted)} />
        <span>Eu concordo com os <Link href="/termos"><a><strong>Termos e condições</strong></a></Link></span>
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

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})