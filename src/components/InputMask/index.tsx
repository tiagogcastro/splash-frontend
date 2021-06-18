import React, { useRef, useEffect } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { useField } from '@unform/core';
import styles from './styles.module.scss';
interface Props extends InputProps {
  name: string;
}
const InputMask: React.FC<Props> = ({ name, ...rest }) =>{
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
    <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
    <div className={styles.container__errors}>{error}</div>
  </div>
  );
};
export default InputMask