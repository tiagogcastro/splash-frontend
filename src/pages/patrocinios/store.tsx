import styles from '@styles/pages/patrocinios/store.module.scss'
import Header from '@components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
        <Header text="Loja de Nutella" returnPage ="/" />
        <div className={styles.content}>
            <ul className={styles.sponsorList}>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>Loja de Nutella enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>Loja de Nutella enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>Loja de Nutella enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h2>Loja de Nutella enviou R$ 3,00 para você</h2>
                        <span>Há 7 dias</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}
