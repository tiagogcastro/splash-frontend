import styles from '@styles/pages/patrocinios/saldo.module.scss'
import Header from '@components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
        <Header text="Saldo" returnPage="/"/>
        <div className={styles.content}>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Pesquisar" />
            </div>
            <ul className={styles.storeList}>
                <li className={styles.store}>
                    <div className={styles.first}>
                        <div className={styles.img}></div>
                        <div className={styles.text}>
                            <h2>Gustavo</h2>
                            <span>R$ 2000,00 disponível</span>
                        </div>
                    </div>
                    <div className={styles.second}>
                        <a href="">
                            <button>Pagar</button>
                        </a>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.first}>
                        <div className={styles.img}></div>
                        <div className={styles.text}>
                            <h2>Gustavo</h2>
                            <span>R$ 2000,00 disponível</span>
                        </div>
                    </div>
                    <div className={styles.second}>
                        <a href="">
                            <button>Pagar</button>
                        </a>
                    </div>
                </li>
                <li className={styles.store}>
                    <div className={styles.first}>
                        <div className={styles.img}></div>
                        <div className={styles.text}>
                            <h2>Gustavo</h2>
                            <span>R$ 2000,00 disponível</span>
                        </div>
                    </div>
                    <div className={styles.second}>
                        <a href="">
                            <button>Pagar</button>
                        </a>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
  )
}
