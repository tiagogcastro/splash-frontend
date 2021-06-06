import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  url?: string;
}

const Button: React.FC<ButtonProps> = ({ children, url = '', ...rest }) => {
  return (
    <a href={url} className={styles.container}>
      <button {...rest} className={styles.button}>
        {children}
      </button>
    </a>
    
  );
};

export default Button;