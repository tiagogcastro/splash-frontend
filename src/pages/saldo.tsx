import styles from '@styles/pages/saldo.module.scss'
import Header from '@components/Header'
import { useEffect } from 'react'
import api from 'src/services/api'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { formatPrice } from 'src/utils/formatPrice'
import { withSSRAuth } from 'src/utils/withSSRAuth'

export default function Saldo(): JSX.Element {
    const [sponsors, setSponsors] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const filterSponsors = (sponsors, query) => {
        if (!query) {
            return sponsors;
        }

        return sponsors.filter((sponsor) => {
            const sponsorName = sponsor.sponsor.name.toLowerCase();
            return sponsorName?.includes(query);
        });
    };

    const filteredSponsors = filterSponsors(sponsors, searchQuery);

    useEffect(() => {
        api.get(`/sponsorships/sponsored/me`).then(response => {
            setSponsors(response.data)
        })
    }, [])

    return (
    <div className={styles.container}>
        <Header text="Saldo"/>
        <div className={styles.content}>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Pesquisar" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>



            <ul className={styles.storeList}>
                { filteredSponsors.map(sponsor => (
                    <li className={styles.store} key={sponsor.id}>
                        <div className={styles.first}>
                            <img src={sponsor.sponsor.avatar_url ? sponsor.sponsor.avatar_url : 'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'} alt={sponsor.sponsor.username}
                            className={styles.img}></img>
                            <div className={styles.text}>
                                <h2>{ sponsor.sponsor.name }</h2>
                                <span>{formatPrice(sponsor.balance_amount)} disponível</span>
                            </div>
                        </div>
                        <div className={styles.second}>
                            <a href={`/patrocinar/valor?user_id=${sponsor.sponsor.id}`}>
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

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
    const user = JSON.parse(parseCookies(context)["%40Lavimco%3Auser"])

    return {
      props: {
        user,
      }
    }
})
