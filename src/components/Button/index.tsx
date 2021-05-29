import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={styles.button} type="button" {...rest}>
      {children}
    </button>
  );
};

export default Button;