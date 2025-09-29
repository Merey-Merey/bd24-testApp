import { useState } from 'react';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  isLogin: boolean;
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

const validatePassword = (password: string) => {
  return ''; 
};

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Имя обязательно';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form data before validation:', formData);

     if (!validateForm()) {
    console.log('Validation failed, errors:', errors);
    return;
  }
    console.log('Form is valid, submitting...');

    setIsLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
console.log('Server response:', { status: response.status, data });

if (response.ok) {
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  onSuccess();
} else {
  setErrors({ submit: data.error });
  console.error('Server error:', data.error);
}

    } catch (error) {
      setErrors({ submit: 'Произошла ошибка' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const isFormValid = () => {
    if (isLogin) {
      return formData.email && formData.password;
    } else {
      return formData.email && 
             formData.password && 
             formData.confirmPassword && 
             formData.name;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {!isLogin && (
        <div className={styles.inputGroup}>
          <label htmlFor="name">Логин</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.error : ''}
            placeholder="Введите ваш логин"
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>
      )}
      
      <div className={styles.inputGroup}>
        <label htmlFor="email">{isLogin ? 'Email' : 'Mail'}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.error : ''}
          placeholder={isLogin ? "Email" : "Mail"}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="password">Пароль</label>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? styles.error : ''}
            placeholder="Введите ваш пароль"
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
      </div>
      
      {!isLogin && (
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Повторите пароль</label>
          <div className={styles.passwordInput}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? styles.error : ''}
              placeholder="Повторите ваш пароль"
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
        </div>
      )}
      
      {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
      
      <button 
        type="submit" 
        // disabled={!isFormValid() || isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Загрузка...' : isLogin ? 'Вход' : 'Отправить'}
      </button>
    </form>
  );
};

export default AuthForm;