import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AuthForm from '@/components/AuthForm/AuthForm';
import styles from '@/styles/Auth.module.scss';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  
  const handleAuthSuccess = () => {
    router.push('/dashboard');
  };
  
  return (
    <div className={styles.container}>
      {/* Левая сторона - форма */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          <h1>ЛОГОТИП</h1>
          <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
          
          <AuthForm 
            isLogin={isLogin} 
            onSuccess={handleAuthSuccess} 
          />
          
          <div className={styles.divider}>
            <span>или</span>
          </div>
          
          <p className={styles.switchMode}>
            {isLogin ? '' : ''}{' '}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Регистрация' : 'Вход'}
            </button>
          </p>
        </div>
      </div>
      
      {/* Правая сторона - картинка машины */}
      <div className={styles.imageSide}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/car.jpg"
            alt="Car Background"
            fill
            priority
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
}