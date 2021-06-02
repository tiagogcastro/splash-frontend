import React, { useState } from 'react'

import styles from './styles.module.scss';

type MenuProps = {
    page: string;
}

const Menu: React.FC<MenuProps> = ({ page }) => {

    const [currentPage, setCurrentPage] = useState(page);

  return (
    <div className={styles.menu}>
      <a href="#">
        <button>
          <img src={currentPage === 'sponsor' ? "/icons/sponsorship_black.png" : "/icons/sponsorship_gray.png"} alt="Patrocínio" />
          <span className={currentPage === 'sponsor' ? styles.selected : null}>Perfil</span>
        </button>
      </a>
      <a href="#">
        <button><img src="/icons/plus_gray.png" alt="Ícone de Adicionar" /></button>
      </a>
      <a href="#">
        <button>
          <img src={currentPage === 'profile' ? "/icons/profile_black.png" : "/icons/profile_gray.png"} alt="Perfil" />
          <span className={currentPage === 'profile' ? styles.selected : null}>Perfil</span>
        </button>
      </a>
    </div>
  );
};

export default Menu;