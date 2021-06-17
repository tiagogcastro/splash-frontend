import Header from '@components/Header';

import styles from '@styles/pages/termos.module.scss'

export default function Termos() {
  return (
    <>
      <div className={styles.container}>
        <Header text="Termos e condições" />
        <div className={styles.content}>
          <h1>Termos e condições</h1>
          <div className={styles.text}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque reiciendis adipisci enim, amet maxime possimus, reprehenderit corrupti magni assumenda sequi atque sint ratione a voluptatum laboriosam, nam nihil est deleniti.</p>
          </div>
        </div>
      </div>
    </>
  )
}
