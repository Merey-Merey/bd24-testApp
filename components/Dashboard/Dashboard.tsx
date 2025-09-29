import React, { useEffect, useState } from 'react';
import OrdersSection from './OrdersSection';
import ProfileSection from './ProfileSection';
import BroadcastSection from './BroadcastSection';
import PaymentsSection from './PaymentsSection';
import styles from './Dashboard.module.scss';

interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        {user && (
          <span className={styles.welcome}>
            Привет, {user.name || user.email} 👋
          </span>
        )}
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <OrdersSection />
          <BroadcastSection />
        </div>

        <div className={styles.column}>
          {user && <ProfileSection user={user} />}
          <PaymentsSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
