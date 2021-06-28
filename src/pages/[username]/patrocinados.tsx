import Header from '@components/Header';

import styles from '@styles/pages/perfil/sponsors.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from 'src/services/api';

import { GetServerSideProps } from 'next';
import {parseCookies} from 'nookies'
import { withSSRAuth } from 'src/utils/withSSRAuth';
interface ISponsored {
  id: string
  sponsored: {
    name?: string
    username: string
    avatar_url?: string
  }
}
export default function Patrocinadores({ user }) {

  const [sponsored, setSponsored] = useState<ISponsored[]>([])

  useEffect(() => {
    api.get(`/sponsors/sponsored/${user.id}`).then(response => {
      let responseSponsored = response.data;

      setSponsored(responseSponsored)
    })
  }, [])

  if (!sponsored) {
    return null
  }

  return (
    <>
      <div className={styles.container}>
        <Header text="Patrocinados" />
        <div className={styles.content}>
          { sponsored.map(sponsoredMapped => (
          <Link key={sponsoredMapped.id} href={`/${sponsoredMapped.sponsored.username}`}>
            <li className={styles.user}>
              <div className={styles.first}>
                  <div className={styles.img}>
                    <img alt={user.username} className={styles.img} src={
                      sponsoredMapped.sponsored.avatar_url ?
                      sponsoredMapped.sponsored.avatar_url :
                      'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'}
                    />
                  </div>
                  <div className={styles.text}>
                    <h2>{sponsoredMapped.sponsored.name}</h2>
                    <span>@{sponsoredMapped.sponsored.username}</span>
                  </div>
              </div>
              <div className={styles.second}>
                <span>Perfil</span>
                <FiChevronRight size={15} color="#8a8a8e" />
              </div>
            </li>
          </Link>
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
