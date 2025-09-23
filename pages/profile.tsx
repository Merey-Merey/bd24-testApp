import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import ProfileForm from '@/components/ProfileForm/ProfileForm';
import styles from '@/styles/Profile.module.scss';

interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  bitrix_contact_id?: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleUpdate = async (data: Partial<User>): Promise<boolean> => {
    try {
      const response = await fetch('/api/bitrix/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId: user?.bitrix_contact_id,
          ...data,
        }),
      });

      if (response.ok) {
        // Обновляем данные пользователя в состоянии
        setUser(prev => prev ? { ...prev, ...data } : null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update error:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div>Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <ProfileForm user={user} onUpdate={handleUpdate} />
      </main>
    </div>
  );
}