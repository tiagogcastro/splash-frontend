import Header from '../../components/Header';

import styles from '../../styles/pages/profile.module.scss';

export default function Login() {
  return (
    <>
      <div className={styles.container}>
          <Header text="username" returnPage="/home" />
      </div>
    </>
  )
}
