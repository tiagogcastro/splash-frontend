import styles from '@styles/pages/patrocinios/store.module.scss'
import Header from '@components/Header'
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();
  const query = router.query;

  const id = query.id as string;

  return (
    <div className={styles.container}>
        <Header text={id} returnPage ="/" />
        <div className={styles.content}>
            <ul className={styles.sponsorList}>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>{id} enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>{id} enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>{id} enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>{id} enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}
