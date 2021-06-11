import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth';

import styles from './styles.module.scss';

type MenuProps = {
    page: string;
}

interface IUser {
  username: string;
}

const Menu: React.FC<MenuProps> = ({ page }) => {
  const {user} = useAuth()
  const [me, setMe] = useState({} as IUser)

  useEffect(() => {
    setMe(user)
  }, [])

  return (
    me ? (
      <div className={styles.menu}>
        <Link href="/dashboard">
          <a>
            <button>
              <img src={page === 'sponsor' ? "/icons/sponsorship_black.png" : "/icons/sponsorship_gray.png"} alt="Patrocínio" />
              <span className={page === 'sponsor' ? styles.selected : null}>Patrocínios</span>
            </button>
          </a>
        </Link>
        <Link href="/patrocinar">
          <a>
            <button><img src="/icons/plus_gray.png" alt="Ícone de Adicionar" /></button>
          </a>
        </Link>
        <Link href={`/${me.username}`}>
          <a>
            <button>
              <img src={page === 'profile' ? "/icons/profile_black.png" : "/icons/profile_gray.png"} alt="Perfil" />
              <span className={page === 'profile' ? styles.selected : null}>Perfil</span>
            </button>
          </a>
        </Link>
      </div>
    ) : <p>Carregando...</p>
  );
};

export default Menu;