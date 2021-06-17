import Header from '@components/Header';

import styles from '@styles/pages/perfil/sponsors.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from 'src/services/api';

import { GetServerSideProps } from 'next';
import {parseCookies} from 'nookies'
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function Patrocinadores({ user }) {

  const [sponsoredList, setSponsoredList] = useState([])

  useEffect(() => {
    api.get(`/sponsors/sponsored/${user.id}`).then(response => {
      let responseSponsored = response.data;
      
      setSponsoredList(responseSponsored)
    })
  }, [])

  if (!sponsoredList) {
    return (
      <>
      </>
    )
  }
  
  return (
    <> 
      <div className={styles.container}>
        <Header text="Patrocinados" />
        <div className={styles.content}>
          { sponsoredList.map(sponsored => (
            <li key={sponsored.id} className={styles.user}>
              <div className={styles.first}>
                  <div className={styles.img}>
                    <img alt={user.username} className={styles.img} src={user.avatar ? user.avatar_url : 'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'} />
                  </div>
                  <div className={styles.text}>
                      <h2>{sponsored.sponsored.name}</h2>
                      <span>@{sponsored.sponsored.username}</span>
                  </div>
              </div>
              <div className={styles.second}>
                <Link href={`/${sponsored.sponsored.username}`}>
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