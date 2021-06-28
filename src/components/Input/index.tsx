import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import ReactInputMask from 'react-input-mask';
interface InputProps extends InputHTMLAttributes<HTMLElement> {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  mask?: string | (string | RegExp)[]
}
const Input: React.FC<InputProps> = ({ name, mask, onChange, ...rest }) => {
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
      {
        mask ?
        <ReactInputMask
          className={styles.container__child}
          mask={mask}
          onChange={onChange}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        /> :
        <input
          onChange={onChange}
          className={styles.container__child}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      }

      <div className={styles.container__errors}>{error}</div>
    </div>
  );
};
export default Input
