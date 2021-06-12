import Header from '@components/Header';

import styles from '@styles/pages/share.module.scss'
import { useRouter } from 'next/router';

export default function Termos() {

  return (
    <>
      <div className={styles.container}>
        <Header text="Termos e condições" />
        <div className={styles.content}>
          <h1>Termos e condições</h1>
          <div className={styles.text}>
            <p>lorem impisulon dolor</p>
          </div>
        </div>
      </div>
    </>
  )
}