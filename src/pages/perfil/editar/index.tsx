import Header from '@components/Header';

import styles from '@styles/pages/perfil/editar.module.scss';
import { FiChevronRight  } from 'react-icons/fi'
import { AiOutlineCamera  } from 'react-icons/ai'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRef } from 'react';
import api from 'src/services/api';
import { useAuth } from 'src/hooks/useAuth';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function Edit({ user }) {
  const { saveOnCookies } = useAuth()
  const cameraRef = useRef<any>()
  const inputFileRef = useRef<any>()

  const [camera, setCamera] = useState(false)
  const [newAvatar, setNewAvatar] = useState<string | null>(user.avatar_url)

  const handleUpdateAvatar = async (e) => {
    const formData = new FormData()
    formData.append('avatar', e.target.files[0])

    const response = await api.patch('/profile/avatar', formData)

    setNewAvatar(response.data.avatar_url)

    saveOnCookies({user: response.data})
  }

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
        <Header backURL={`/${user.username}`} text="Editar perfil" />
        <div className={styles.content}>
          <div className={styles.fields}>
            <div className={styles.avatar} ref={cameraRef}>
              { camera && (
                <>
                  <input type="file" name="file" className={styles.inputFile} ref={inputFileRef} accept="image/*" onChange={handleUpdateAvatar} />
                  <label htmlFor="file" className={styles.inputFile}>
                    <div className={styles.opacity}>
                      <AiOutlineCamera className={styles.icon} size={30} color="#ffffff" />
                    </div>
                  </label>
                </>
              ) }
              <img
                className={styles.img}
                src={
                  newAvatar ?
                  newAvatar :
                  'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png'
                }
                alt={user.username}
              />
            </div>
            <div className={styles.field}>
              <p>Nome</p>
              <a href={`/perfil/editar/nome?name=${user.name}`}>
                {user.name}
                <FiChevronRight size={16} color="#5e646e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Nome de usuário</p>
              <a href={`/perfil/editar/username?username=${user.username}`}>
                {user.username}
                <FiChevronRight size={16} color="#5e646e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Email</p>
              <a href={`/perfil/editar/email?email=${user.email}`}>
                {user.email}
                <FiChevronRight size={16} color="#5e646e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Senha</p>
              <a href="/perfil/editar/senha">
                ********
                <FiChevronRight size={16} color="#5e646e" />
              </a>
            </div>
            <div className={styles.field}>
              <p>Biografia</p>
              <a href={`/perfil/editar/biografia?bio=${user.bio}`}>
                Editar biografia
                <FiChevronRight size={16} color="#5e646e" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const user = JSON.parse(parseCookies(context)["%40Lavimco%3Auser"])

  return {
    props: {
      user,
    }
  }
})
