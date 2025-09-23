import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  name?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  label,
  name,
  required = false
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;