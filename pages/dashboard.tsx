import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Dashboard from '@/components/Dashboard/Dashboard';
import styles from '@/styles/Dashboard.module.scss';

interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
}

export default function DashboardPage() {
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
        <Dashboard user={user} />
      </main>
    </div>
  );
}