import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <a href="" className={styles.container}>
      <button className={styles.button} type="button">
          {children}
      </button>
    </a>
    
  );
};

export default Button;