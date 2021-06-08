import styles from '@styles/pages/patrocinar/index.module.scss'
import Header from '@components/Header'
import Button from '@components/Button'

export default function Home() {
  return (
    <div className={styles.container}>
        <Header text="Patrocinar"/>
        <div className={styles.content}>
            <div className={styles.innerContent}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Pesquisar" />
                </div>
                <ul className={styles.storeList}>
                    <li className={styles.store}>
                        <div className={styles.first}>
                            <div className={styles.img}></div>
                            <div className={styles.text}>
                                <h2>Diam nec</h2>
                                <span>lorem ipsum</span>
                            </div>
                        </div>
                        <div className={styles.second}>
                            <a href="">
                                <button>Enviar patrocínio</button>
                            </a>
                        </div>
                    </li>
                    <li className={styles.store}>
                        <div className={styles.first}>
                            <div className={styles.img}></div>
                            <div className={styles.text}>
                                <h2>Diam nec</h2>
                                <span>lorem ipsum</span>
                            </div>
                        </div>
                        <div className={styles.second}>
                            <a href="">
                                <button>Enviar patrocínio</button>
                            </a>
                        </div>
                    </li>
                    <li className={styles.store}>
                        <div className={styles.first}>
                            <div className={styles.img}></div>
                            <div className={styles.text}>
                                <h2>Diam nec</h2>
                                <span>lorem ipsum</span>
                            </div>
                        </div>
                        <div className={styles.second}>
                            <a href="">
                                <button>Enviar patrocínio</button>
                            </a>
                        </div>
                    </li>

                    
                </ul>
            </div>
            
            <div className={styles.buttonConfirmation}>
              <Button url="/patrocinar/valor">Continuar</Button>
            </div>
        </div>
    </div>
  )
}
