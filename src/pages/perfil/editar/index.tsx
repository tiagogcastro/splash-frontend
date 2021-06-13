import Header from '@components/Header';

import styles from '@styles/pages/perfil/editar.module.scss';
import { FiChevronRight  } from 'react-icons/fi'
import { AiOutlineCamera  } from 'react-icons/ai'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

export default function Edit({ user }) {
  const {query} = useRouter()
  const token = query.token
  
  return (
    <>
      <div className={styles.container}>
        <Header text="Editar perfil" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.avatar}>
              <AiOutlineCamera className={styles.icon} size={30} color="#ffffff" />
              <img src="/logo.png" alt="Avatar" />
            </div>
            <div className={styles.field}>
              <p>Nome</p>
              <a href={`/perfil/editar/nome?name=${user.name}`}>
                {user.name}
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Nome de usuário</p>
              <a href={`/perfil/editar/username?username=${user.username}`}>
                {user.username}
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Email</p>
              <a href={`/perfil/editar/email?email=${user.email}&token=${token}`}>
                {user.email}
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Senha</p>
              <a href="/perfil/editar/senha">
                ********
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Biografia</p>
              <a href={`/perfil/editar/biografia?bio=${user.bio}`}>
                Editar biografia
                <FiChevronRight size={15} color="#8a8a8e" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = JSON.parse(parseCookies(context)["%40Lavimco%3Auser"])

  return {
    props: {
      user,
    }
  }
}