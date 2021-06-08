import Header from '@components/Header';
import Link from 'next/link'

import styles from '@styles/pages/share.module.scss'
import { useRouter } from 'next/router';

export default function Share() {

  const router = useRouter()
  const query = router.query;

  const cod = query.cod as string;

  return (
    <>
      <div className={styles.container}>
        <Header text={"Nome da loja"} />
        <div className={styles.content}>
          <div className={styles.img}>
            <img src="/qrcode.png" alt="" />
          </div>

          <div className={styles.text}>
            <h2>{cod}</h2>
            <Link href="/">
              <a>lavimco.com</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}