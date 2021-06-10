import Header from '@components/Header';
import Button from '@components/Button';
import Menu from '@components/Menu';
import Error from '@components/Error';

import styles from '@styles/pages/perfil.module.scss';
import api from 'src/services/api';
import { GetServerSideProps } from 'next';
import {parseCookies} from 'nookies'

export default function Perfil({ user, userType }) {
  if (!user) {
    return (
      <Error />
    )
  }

  return (
    <div className={styles.container}>
      <Header text={user.username} />
      <div className={styles.content}>
        <div className={styles.img}></div>

        <div className={styles.text}>
          <h1>{user.name}</h1>
          <span>@{user.username}</span>
          <p>{user.bio || 'Sem descrição.'}</p>
        </div>

        <div className={styles.statistics}>
          <div className={styles.stat}>
            <span className={styles.number}>200</span>
            <span className={styles.text}>patrocinadores</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>15</span>
            <span className={styles.text}>patrocinando</span>
          </div>
        </div>

        { userType === "shop-me" ? ( 
          <>
            <Button url="/perfil/editar">Editar</Button>
            <Button>Compartilhar</Button>
          </>
        ) : userType === "me" ? (
          <Button>Editar</Button> 
        ) : userType === "shop" ? ( 
          <Button>Copatrocinando</Button> 
        ) : userType === "user" && (
          <Button>Patrocinar</Button> 
        ) }

      </div>
      <Menu page="profile" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = JSON.parse(parseCookies(context)["%40Lavimco%3Auser"])
  const token = parseCookies(context)["%40Lavimco%3Atoken"]

  const { username } = context.query

  try {
    const {data} = await api.get(`/profile/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    let userType = ""

    if (user.username === username) {
      if (user.roles === "shop") {
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
      }
    }
  } catch (err) {
    return {
      props: {
        user: null,
        userType: null,
      }
    }
  }
}