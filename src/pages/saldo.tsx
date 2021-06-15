import styles from '@styles/pages/saldo.module.scss'
import Header from '@components/Header'
import { useEffect } from 'react'
import api from 'src/services/api'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Saldo({ user }) {
    const [sponsors, setSponsors] = useState([])

    useEffect(() => {
        api.get(`/sponsors/sponsored/${user.id}`).then(response => {
            setSponsors(response.data)
        })
    }, [])
  
    return (
    <div className={styles.container}>
        <Header text="Saldo"/>
        <div className={styles.content}>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Pesquisar" />
            </div>
            <ul className={styles.storeList}>
                { sponsors.map(sponsor => (
                    <li className={styles.store}>
                        <div className={styles.first}>
                            <img src={sponsor.sponsored.avatar_url ? sponsor.sponsored.avatar_url : 'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'} className={styles.img}></img>
                            <div className={styles.text}>
                                <h2>{ sponsor.sponsored.name }</h2>
                                <span>R$ 2000,00 disponível</span>
                            </div>
                        </div>
                        <div className={styles.second}>
                            <a href="">
                                <button>Pagar</button>
                            </a>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = JSON.parse(parseCookies(context)["%40Lavimco%3Auser"])

    return {
      props: {
        user,
      }
    }
  }