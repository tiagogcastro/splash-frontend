import Link from 'next/link';
import React, { useState } from 'react'

import styles from './styles.module.scss';

type MenuProps = {
    page: string;
}

const Menu: React.FC<MenuProps> = ({ page }) => {

    const [currentPage, setCurrentPage] = useState(page);

  return (
    <div className={styles.menu}>
      <Link href="/dashboard">
        <a>
          <button>
            <img src={currentPage === 'sponsor' ? "/icons/sponsorship_black.png" : "/icons/sponsorship_gray.png"} alt="Patrocínio" />
            <span className={currentPage === 'sponsor' ? styles.selected : null}>Patrocínios</span>
          </button>
        </a>
      </Link>
      <Link href="/patrocinar">
        <a>
          <button><img src="/icons/plus_gray.png" alt="Ícone de Adicionar" /></button>
        </a>
      </Link>
      <Link href="/userId">
        <a href="#">
          <button>
            <img src={currentPage === 'profile' ? "/icons/profile_black.png" : "/icons/profile_gray.png"} alt="Perfil" />
            <span className={currentPage === 'profile' ? styles.selected : null}>Perfil</span>
          </button>
        </a>
      </Link>
    </div>
  );
};

export default Menu;