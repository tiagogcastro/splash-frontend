import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';
interface InputProps extends InputHTMLAttributes<HTMLElement> {
  name: string;
}
const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  return (
    <div className={styles.container}>
      <input className={styles.container__child} ref={inputRef} defaultValue={defaultValue} {...rest} />
      <div className={styles.container__errors}>{error}</div>
    </div>
  );
};
export default Input