import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  children: ButtonProps;
  url: string
}

const Button: React.FC<Props> = ({ children, url}) => {
  return (
    <a href={url} className={styles.container}>
      <button className={styles.button} type="button">
          {children}
      </button>
    </a>
    
  );
};

export default Button;