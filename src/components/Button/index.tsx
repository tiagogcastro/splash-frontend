import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  url?: string;
}

const Button: React.FC<ButtonProps> = ({ children, url = '', ...rest }) => {
  if (url) {
    return (
      <Link href={url}>
        <a className={styles.container}>
          <button {...rest} className={styles.button}>
            {children}
          </button>
        </a>
      </Link>
    );
  } else {
    return (
      <div className={styles.container}>
        <button {...rest} className={styles.button}>
          {children}
        </button>
      </div>
    );
  }
};

export default Button;