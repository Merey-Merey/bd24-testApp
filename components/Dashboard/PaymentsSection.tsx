import React, { useState } from 'react';
import styles from './PaymentsSection.module.scss';

interface PaymentData {
  id: number;
  employee: {
    name: string;
    email: string;
    avatar: string;
  };
  status: 'notCovered' | 'paid';
  progress: number;
}

const PaymentsSection: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const paymentsData: PaymentData[] = [
    {
      id: 1,
      employee: {
        name: 'Имя',
        email: 'Почта@jourrapide.com',
        avatar: 'И'
      },
      status: 'notCovered',
      progress: 96
    },
    {
      id: 2,
      employee: {
        name: 'Gregory Davis A',
        email: 'gregorydavis@dayrep.com',
        avatar: 'G'
      },
      status: 'paid',
      progress: 73
    },
    {
      id: 3,
      employee: {
        name: 'Gregory Davis A',
        email: 'gregorydavis@dayrep.com',
        avatar: 'G'
      },
      status: 'paid',
      progress: 73
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Все платежи за последнюю неделю' },
    { value: 'paid', label: 'Оплаченные' },
    { value: 'notCovered', label: 'Не оплаченные' },
  ];

  const filteredPayments = paymentsData.filter(payment => {
    switch (selectedFilter) {
      case 'all':
        return true;
      case 'paid':
        return payment.status === 'paid';
      case 'notCovered':
        return payment.status === 'notCovered';
      case 'highProgress':
        return payment.progress > 90;
      case 'lowProgress':
        return payment.progress < 80;
      default:
        return true;
    }
  });

  const getStatusText = (status: 'notCovered' | 'paid') => {
    return status === 'paid' ? 'Оплачено' : 'Не оплачено';
  };

  const handleFilterSelect = (filterValue: string) => {
    setSelectedFilter(filterValue);
    setIsFilterOpen(false);
  };

  return (
    <div className={styles.paymentsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.line}></span>Платежи
        </h2>
        
        <div className={styles.filterContainer}>
          <div 
            className={styles.filterSection}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className={styles.filterLabel}>
              {filterOptions.find(opt => opt.value === selectedFilter)?.label}
            </span>
            <span className={`${styles.filterArrow} ${isFilterOpen ? styles.rotate : ''}`}>▼</span>
          </div>
          
          {isFilterOpen && (
            <div className={styles.filterDropdown}>
              {filterOptions.map(option => (
                <div
                  key={option.value}
                  className={`${styles.filterOption} ${
                    selectedFilter === option.value ? styles.selected : ''
                  }`}
                  onClick={() => handleFilterSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.paymentsContent}>
        <div className={styles.paymentsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.colEmployee}>Employee ↑</div>
            <div className={styles.colStatus}>Статус</div>
            <div className={styles.colProgress}>Выполнено</div>
            <div className={styles.colAction}>Действие</div>
          </div>
          
          {filteredPayments.map((payment) => (
            <div key={payment.id} className={styles.tableRow}>
              <div className={styles.colEmployee}>
                <div className={styles.employeeInfo}>
                  <div className={styles.employeeAvatar}>{payment.employee.avatar}</div>
                  <div className={styles.employeeDetails}>
                    <div className={styles.employeeName}>{payment.employee.name}</div>
                    <div className={styles.employeeEmail}>{payment.employee.email}</div>
                  </div>
                </div>
              </div>
              <div className={styles.colStatus}>
                <span className={`${styles.status} ${styles[payment.status]}`}>
                  {getStatusText(payment.status)}
                </span>
              </div>
              <div className={styles.colProgress}>
                <span className={styles.progressText}>{payment.progress}%</span>
              </div>
              <div className={styles.colAction}>
                <button className={styles.actionButton}>Смотреть</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentsSection;