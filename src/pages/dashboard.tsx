import styles from '@styles/pages/home.module.scss'
import Menu from '@components/Menu'
import { useEffect, useState } from 'react'
import api from 'src/services/api'

export default function Home() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    api.get('/notifications/sponsorships').then(response => {
        setNotifications(response.data)
    })
  }, [])
  
    return (
    <div className={styles.container}>
        <div className={styles.head}>
            <h1>R$ 800,05</h1>
            <span>R$ 400,00 disponível para saque</span>
        </div>
        <div className={styles.content}>
            <ul className={styles.userList}>
                <li className={styles.user}>
                    <div className={styles.first}>
                        <div className={styles.img}></div>
                        <div className={styles.text}>
                            <h2>Gustavo</h2>
                            <span>Você enviou R$ 4,00</span>
                        </div>
                    </div>
                    <div className={styles.second}>
                        <a href="/patrocinios/Gustavo">
                            <span>Today</span>
                            <span>&gt;</span>
                        </a>
                    </div>
                </li>
                <li className={styles.user}>
                    <div className={styles.first}>
                        <div className={styles.img}></div>
                        <div className={styles.text}>
                            <h2>Gustavo</h2>
                            <span>Você enviou R$ 4,00</span>
                        </div>
                    </div>
                    <div className={styles.second}>
                        <a href="/patrocinios/Gustavo">
                            <span>Today</span>
                            <span>&gt;</span>
                        </a>
                    </div>
                </li>
                <li className={styles.user}>
                    <div className={styles.first}>
                        <span className={styles.img}></span>
                        <div className={styles.text}>
                            <h2>Gustavo</h2>
                            <span>Você enviou R$ 4,00</span>
                        </div>
                    </div>
                    <div className={styles.second}>
                        <a href="/patrocinios/Gustavo">
                            <span>Today</span>
                            <span>&gt;</span>
                        </a>
                    </div>
                </li>
                <li className={styles.user}>
                    <div className={styles.first}>
                        <div className={styles.img}></div>
                        <div className={styles.text}>
                            <h2>Gustavo</h2>
                            <span>Você enviou R$ 4,00</span>
                        </div>
                    </div>
                    <div className={styles.second}>
                        <a href="/patrocinios/Gustavo">
                            <span>Today</span>
                            <span>&gt;</span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <Menu page="sponsor" />
    </div>
  )
}
