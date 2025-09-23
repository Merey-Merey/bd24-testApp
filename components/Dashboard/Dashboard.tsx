// Dashboard.tsx
import React from 'react';
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

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        {user && (
          <>
            <span className={styles.welcome}>Привет, {user.name || user.email}  👋 </span>
          </>
        )}
      </div>      
      <div className={styles.grid}>
        <div className={styles.column}>
          <OrdersSection />
          <BroadcastSection />
        </div>

        <div className={styles.column}>
          <ProfileSection user={user} />
                    <PaymentsSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;