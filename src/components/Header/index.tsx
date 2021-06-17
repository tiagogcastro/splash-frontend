import { useRouter } from 'next/router';
import React from 'react';
import styles from './styles.module.scss';
import {IoMdArrowBack} from 'react-icons/io'

type Props = {
    text: string;
    backURL?: string;
}

const Header: React.FC<Props> = ({ text, backURL }) => {
  const router = useRouter()
  
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <button type="button" onClick={() => backURL ? router.push(backURL) : router.back()}>
          <IoMdArrowBack size={20} />
        </button>
        <h2>{ text }</h2>
      </div>
    </div>
  );
};

export default Header;