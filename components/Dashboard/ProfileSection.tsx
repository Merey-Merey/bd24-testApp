import React from 'react';
import styles from './ProfileSection.module.scss';

interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
}

interface ProfileSectionProps {
  user: User;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  return (
    <div className={styles.profileSection}>
      <h2 className={styles.sectionTitle}> <span className={styles.line}></span>Профиль</h2>
      
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
        </div>
        
        <div className={styles.profileInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Имя</span>
            <span className={styles.value}>{user.name || ' '}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user.email || ''}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Телефон</span>
            <span className={styles.value}>{user.phone || ''}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Адрес</span>
            <span className={styles.value}>{user.address || ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;