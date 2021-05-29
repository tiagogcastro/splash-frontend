import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <a href="">
        <button>
          <img src="icons/sponsorship.png" alt="Icone de Patrocínios" />
          <p>Patrocínios</p>
        </button>
      </a>
      <a href="">
        <button><img src="" alt="" /></button>
      </a>
      <a href="">
      <button>
          <img src="" alt="" />
          <p>Perfil</p>
        </button>
      </a>
    </div>
  );
};

export default Footer;