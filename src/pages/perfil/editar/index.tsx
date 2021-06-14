import Header from '@components/Header';

import styles from '@styles/pages/perfil/editar.module.scss';
import { FiChevronRight  } from 'react-icons/fi'
import { AiOutlineCamera  } from 'react-icons/ai'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function Edit({ user }) {
  const {query} = useRouter()
  const token = query.token
  const cameraRef = useRef<any>()
  const inputFileRef = useRef<any>()

  const [camera, setCamera] = useState(false)

  
  const handleClick = (e) => {
    if (cameraRef.current.contains(e.target)) {
      if (camera) {
        inputFileRef.current.click()
      } else {
        setCamera(true)
      }
    } else {
      setCamera(false)
    }
  }

  return (
    <>
      <div className={styles.container} onClick={handleClick}>
        <Header text="Editar perfil" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.avatar} ref={cameraRef}>
              { camera && (
                <>
                  <input type="file" name="file" className={styles.inputFile} ref={inputFileRef} />
                  <label htmlFor="file" className={styles.inputFile}>
                    <AiOutlineCamera className={styles.icon} size={30} color="#ffffff" />
                  </label>
                </>
              ) }
              <img className={styles.img} src={user.avatar ? user.avatar_url : 'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'} alt={user.username} />
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