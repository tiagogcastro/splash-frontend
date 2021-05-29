import React from 'react';
import styles from './styles.module.scss';

type Props = {
    text: string;
    returnPage: string;
}

const Header: React.FC<Props> = ({ text, returnPage }) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <a href={ returnPage }></a>
        <h2>{ text }</h2>
      </div>
    </div>
  );
};

export default Header;