import Header from '../components/Header';
import Button from '../components/Button';
import Menu from '../components/Menu';

import styles from '../styles/pages/profile.module.scss';
import { useRouter } from 'next/router';

export default function Perfil({ params }) {

  const router = useRouter();
  const query = router.query;

  const id = query.id as string;

  return (
    <>
      <div className={styles.container}>
        <Header text={id} returnPage="/home" />
        <div className={styles.content}>
          <div className={styles.img}></div>

          <div className={styles.text}>
            <h1>{id}</h1>
            <span>@{id}</span>
            <p>Iaculis lobortis nibh purus viverra. Non curabitur phasellus faucibus risus massa adipiscing feugiat.</p>
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