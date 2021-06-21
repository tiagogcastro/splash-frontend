import Header from '@components/Header';

import styles from '@styles/pages/perfil/sponsors.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from 'src/services/api';

import { GetServerSideProps } from 'next';
import {parseCookies} from 'nookies'
import { withSSRAuth } from 'src/utils/withSSRAuth';
interface ISponsor {
  id: string
  sponsor: {
    name?: string
    username: string
    avatar_url?: string
  }
}
export default function Patrocinadores({ user }) {

  const [sponsors, setSponsors] = useState<ISponsor[]>([])

  useEffect(() => {
    api.get(`/sponsors/${user.id}`).then(response => {
      let responseSponsorings = response.data;

      setSponsors(responseSponsorings)
    })
  }, [])


  if (!sponsors) {
    return null
  }
  
  return (
    <> 
      <div className={styles.container}>
        <Header text="Patrocinadores" />
        <div className={styles.content}>
          { sponsors.map(sponsor => (
            <li key={sponsor.id} className={styles.user}>
              <div className={styles.first}>
                  <div className={styles.img}>
                    <img alt={user.username} className={styles.img} src={sponsor.sponsor.avatar_url ? sponsor.sponsor.avatar_url : 'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'} />
                  </div>
                  <div className={styles.text}>
                      <h2>{sponsor.sponsor.name}</h2>
                      <span>@{sponsor.sponsor.username}</span>
                  </div>
              </div>
              <div className={styles.second}>
                <Link href={`/${sponsor.sponsor.username}`}>
                  <a>
                    <span>Perfil</span>
                    <FiChevronRight size={15} color="#8a8a8e" />
                  </a>
                </Link>
              </div>
            </li>
          )) }
        </div>
      </div>
    </>
  )
  
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const token = parseCookies(context)["%40Lavimco%3Atoken"]

  const { username } = context.query

  try {
    const {data} = await api.get(`/profile/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      props: {
        user: data,
      }
    }
  } catch (err) {
    return {
      props: {
        user: null,
      }
    }
  }
})