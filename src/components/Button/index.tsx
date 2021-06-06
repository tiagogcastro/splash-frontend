import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string;
}

const Button: React.FC<ButtonProps> = ({ children, link = '', ...rest }) => {
  return (
    <a href={link} className={styles.container}>
      <button {...rest} className={styles.button}>
        {children}
      </button>
    </a>
    
  );
};

export default Button;