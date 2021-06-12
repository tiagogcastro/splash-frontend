import Button from '@components/Button';

import styles from '@styles/pages/signup.module.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginNumber() {
  const [accepted, setAccepted] = useState(false)
  const [sponsorship_code, setSponsorship_code] = useState('')

  return (
    <>
      <div className={styles.container}>
          <div className={styles.avatar}>
            <img src="/logo.png" alt="Logo" />
          </div>

          <span><strong>Lavimco</strong><br/>Faça login ou crie uma conta para inicar </span>

          <input value={sponsorship_code} onChange={(e) => setSponsorship_code(e.target.value)} type="text" placeholder="Digite seu codigo de patrocinio"/>

          <Button url={`/signup/phone?sponsorship_code=${sponsorship_code}`}>Continue com WhatsApp</Button>
      </div>

      <div className={styles.terms}>
        <input checked={accepted} type="checkbox" onChange={(e) => setAccepted(!accepted)} />
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
