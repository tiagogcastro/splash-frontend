import Header from '@components/Header';
import Button from '@components/Button';
import Menu from '@components/Menu';

import styles from '@styles/pages/perfil.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from 'src/hooks/useAuth';
import { useEffect, useState } from 'react';
import api from 'src/services/api';

export default function Perfil() {
  const {user} = useAuth()
  const router = useRouter();
  const query = router.query;
  const id = query.id as string;

  const [currentProfile, setCurrentProfile] = useState({})
  const [profileType, setProfileType] = useState<"shop" | "user" | "me" | "shop-me">(() => {
    if (user.username === id) {
      if (user.role === "user") {
        return "me"
      } else {
        return "shop-me"
      }
    }

    return "user"
  })

  useEffect(() => {
    console.log(id)
    
    if (user.username !== id) {
      api.get(`/profile/${id}`).then(response => {
        setCurrentProfile(response.data)

        console.log(currentProfile)
      })
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Header text={user.username} />
        <div className={styles.content}>
          <div className={styles.img}></div>

          <div className={styles.text}>
            <h1>{user.name}</h1>
            <span>@{user.username}</span>
            <p>{user.bio || `Iaculis lobortis nibh purus viverra. Non curabitur phasellus faucibus risus massa adipiscing feugiat.`}</p>
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

          <Button>Sponsoring</Button>
        </div>
        <Menu page="profile" />
      </div>
    </>
  )
}
