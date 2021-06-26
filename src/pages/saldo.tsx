import utilsStyles from '@styles/utilStyles.module.scss'
import styles from '@styles/pages/saldo.module.scss'
import Header from '@components/Header'
import { useEffect, useMemo } from 'react'
import api from 'src/services/api'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { formatPrice } from 'src/utils/formatPrice'
import { withSSRAuth } from 'src/utils/withSSRAuth'
import { AiOutlineFrown } from 'react-icons/ai'
import Loading from '@components/Loading'
import { useCallback } from 'react'

interface ISponsor {
  id: string
  balance_amount: number
  sponsor: {
    id: string
    username: string
    name?: string
    avatar_url?: string
  }
}
export default function Saldo(): JSX.Element {
    const [sponsors, setSponsors] = useState<ISponsor[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    const filteredSponsors = useMemo(() => {
      if(loading === false){
        if (!searchQuery) {
          return sponsors;
        }

        return sponsors.filter((sponsor) => {
          const sponsorName = sponsor.sponsor.name.toLowerCase();
          return sponsorName.includes(searchQuery);
        });
      }
    }, [sponsors, loading, searchQuery])

    const checkedIfTheUserHasSponsorsOrnot = useMemo(() => {
      if(loading === false && sponsors.length === 0) {
        return false
      }
      return true
    }, [sponsors, loading])

    useEffect(() => {
      api.get(`/sponsorships/sponsored/me`).then(response => {
        setSponsors(response.data)

        setLoading(false)
      })
    }, [])

    return (
    <div className={styles.container}>
        <Header text="Saldo"/>
        <div className={styles.content}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Pesquisar"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

              {loading &&
                <div style={{marginTop: 180}}>
                  <Loading size={30} />
                </div>
              }

            <ul className={styles.storeList}>
                {checkedIfTheUserHasSponsorsOrnot ? filteredSponsors?.map(sponsor => (
                  <li className={styles.store} key={sponsor.id}>
                    <div className={styles.first}>
                      <img
                        src={
                          sponsor.sponsor.avatar_url ?
                          sponsor.sponsor.avatar_url :
                          'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'
                        }
                        alt={sponsor.sponsor.username}
                        className={styles.img}
                      />
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
                )) :
                <div className={utilsStyles.noContent}>
                  <AiOutlineFrown size={60} />
                  <span>
                    Oh! Não tem conteúdo
                  </span>
                </div>
                }
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
