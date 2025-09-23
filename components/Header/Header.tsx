import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  CreditCard, 
  Radio, 
  User, 
  Menu,
  X
} from 'lucide-react';
import styles from './Header.module.scss';

interface User {
  name?: string;
  email: string;
}

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    loadUser();
  }, []);

  const isActive = (path: string) => {
    return router.pathname === path ? styles.active : '';
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
     
        
        <div className={styles.userInfo}>
          {user && (
            <>
              <div className={styles.userAvatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
            </>
          )}
        </div>

        <nav className={styles.nav}>
          <div className={styles.desktopNav}>
            <Link href="/dashboard" className={isActive('/dashboard')}>
              <LayoutDashboard size={20} className={styles.navIcon} />
              Дашборд
            </Link>
             <Link href="/profile" className={isActive('/profile')}>
              <User size={20} className={styles.navIcon} />
              Профиль
            </Link>
            <Link href="/orders" className={isActive('/orders')}>
              <Package size={20} className={styles.navIcon} />
              Заказы
            </Link>
            <Link href="/payments" className={isActive('/payments')}>
              <CreditCard size={20} className={styles.navIcon} />
              Платежи
            </Link>
            <Link href="/broadcast" className={isActive('/broadcast')}>
              <Radio size={20} className={styles.navIcon} /> 
              Трансляция
            </Link>
           
          
          </div>
          
          <div className={styles.mobileNav}>
            <button 
              className={styles.menuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
            
            {isMobileMenuOpen && (
              <div className={styles.mobileMenu}>
                
                <Link 
                  href="/dashboard" 
                  className={isActive('/dashboard')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={20} className={styles.navIcon} />
                  Дашборд
                </Link>
                 <Link 
                  href="/profile" 
                  className={isActive('/profile')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} className={styles.navIcon} />
                  Профиль
                </Link>
                <Link 
                  href="/orders" 
                  className={isActive('/orders')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package size={20} className={styles.navIcon} />
                  Заказы
                </Link>
                <Link 
                  href="/payments" 
                  className={isActive('/payments')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CreditCard size={20} className={styles.navIcon} />
                  Платежи
                </Link>
                <Link 
                  href="/broadcast" 
                  className={isActive('/broadcast')}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Radio size={20} className={styles.navIcon} /> 
                  Трансляция
                </Link>
               
              
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;