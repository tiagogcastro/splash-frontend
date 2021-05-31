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
          <img src="/icons/sponsorship.png" alt="Ícone de Patrocínios" />
          <span className={currentPage === 'patreon' ? styles.selected : null} >Patrocínios</span>
        </button>
      </a>
      <a href="#">
        <button><img src="/icons/plus.png" alt="Ícone de Adicionar" /></button>
      </a>
      <a href="#">
        <button>
          <img src="/icons/profile.png" alt="Ícone de Perfil" />
          <span className={currentPage === 'profile' ? styles.selected : null}>Perfil</span>
        </button>
      </a>
    </div>
  );
};

export default Menu;