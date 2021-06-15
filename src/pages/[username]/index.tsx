import Header from '@components/Header';
import Button from '@components/Button';
import Menu from '@components/Menu';
import Error from '@components/Error';

import styles from '@styles/pages/perfil.module.scss';
import api from 'src/services/api';
import { GetServerSideProps } from 'next';
import {parseCookies} from 'nookies'
import { useEffect } from 'react';
import { useState } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function Perfil({ user, userType, me }) {
  const [isSponsoring, setIsSponsoring] = useState(false)
  
  useEffect(() => {
    api.get(`/sponsors/sponsored/${me.id}`).then(response => {
      response.data.forEach(sponsor => {
        if (user.id === sponsor.sponsored.id) {
          setIsSponsoring(true)
        }
      })
    })
  }, [])
  
  if (!user) {
    return (
      <Error />
    )
  }

  return (
    <div className={styles.container}>
      <Header text={user.username} />
      <div className={styles.content}>
        <img alt={user.username} className={styles.img} src={user.avatar ? user.avatar_url : 'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'} />

        <div className={styles.text}>
          <h1>{user.name}</h1>
          <span>@{user.username}</span>
          <p>{user.bio || 'Sem descrição.'}</p>
        </div>

        <div className={styles.statistics}>
          <div className={styles.stat}>
            <span className={styles.number}>{user.user_sponsor_sponsored_count.sponsor_count}</span>
            <span className={styles.text}>patrocinadores</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>{user.user_sponsor_sponsored_count.sponsored_count}</span>
            <span className={styles.text}>patrocinando</span>
          </div>
        </div>

        { userType === "shop-me" ? ( 
          <Button url={me.email ? "/perfil/editar" : "/perfil/register"}>Editar</Button>
        ) : userType === "me" ? (
          <Button url={me.email ? "/perfil/editar" : "/perfil/register"}>Editar</Button> 
        ) : userType === "shop" && isSponsoring ? ( 
          <Button>Copatrocinando</Button>
        ) : userType === "shop" && !isSponsoring ? (
          <Button>Copatrocinar</Button>
        ) : userType === "user" && isSponsoring ? (
          <Button url="/patrocinar/valor">Patrocinando</Button> 
        ) : userType === "user" && !isSponsoring && (
          <Button url="/patrocinar/valor">Patrocinar</Button> 
        ) }

      </div>
      <Menu page="profile" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const me = JSON.parse(parseCookies(context)["%40Lavimco%3Auser"])
  const token = parseCookies(context)["%40Lavimco%3Atoken"]

  const { username } = context.query

  try {
    const {data} = await api.get(`/profile/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    let userType = ""

    if (me.username === username) {
      if (me.roles === "shop") {
        userType = "shop-me"
      } else {
        userType = "me"
      }
    } else {
      if (data.roles === "shop") {
        userType = "shop"
      } else {
        userType = "user"
      }
    }

    return {
      props: {
        user: data,
        userType,
        me,
      }
    }
  } catch (err) {
    return {
      props: {
        user: null,
        userType: null,
        me,
      }
    }
  }
})