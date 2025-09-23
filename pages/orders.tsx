// pages/orders.tsx
import React from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header'; // Импортируем ваш Header компонент
import styles from './Orders.module.scss';

interface Order {
  id: number;
  status: string;
  serviceDetails: string;
  orderDate: string;
  orderNumber?: string;
}

const OrdersPage: React.FC = () => {
  const orders: Order[] = [
    { id: 1, status: 'Выполнен', serviceDetails: 'Ремонт двигателя', orderDate: '2024-01-15' },
    { id: 2, status: 'В процессе', serviceDetails: 'Замена масла', orderDate: '2024-01-16' },
    { id: 3, status: 'Ожидание', serviceDetails: 'Диагностика', orderDate: '2024-01-17' },
    { id: 4, status: 'Выполнен', serviceDetails: 'Шиномонтаж', orderDate: '2024-01-18' },
    { id: 5, status: 'Отменен', serviceDetails: 'Покраска кузова', orderDate: '2024-01-19' },
    { id: 6, status: 'В процессе', serviceDetails: 'Замена тормозных колодок', orderDate: '2024-01-20' },
    { id: 4, status: 'Выполнен', serviceDetails: 'Шиномонтаж', orderDate: '2024-01-18' },
     { id: 1, status: 'Выполнен', serviceDetails: 'Ремонт двигателя', orderDate: '2024-01-15' },
    { id: 2, status: 'В процессе', serviceDetails: 'Замена масла', orderDate: '2024-01-16' },
    { id: 3, status: 'Ожидание', serviceDetails: 'Диагностика', orderDate: '2024-01-17' },
    { id: 4, status: 'Выполнен', serviceDetails: 'Шиномонтаж', orderDate: '2024-01-18' },
    { id: 5, status: 'Отменен', serviceDetails: 'Покраска кузова', orderDate: '2024-01-19' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Выполнен': return styles.completed;
      case 'В процессе': return styles.inProgress;
      case 'Ожидание': return styles.pending;
      case 'Отменен': return styles.cancelled;
      default: return styles.pending;
    }
  };

  return (
    <>
      <Head>
        <title>Заказы</title>
        <meta name="description" content="Страница заказов" />
      </Head>

      {/* Используем ваш существующий Header */}
      <Header />

      <div className={styles.ordersPage}>
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>
              <span className={styles.titleLine}></span>
              Заказы
            </h1>
          </header>

          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={`${styles.status} ${getStatusColor(order.status)}`}>
                    • {order.status}
                  </span>
                  {order.orderNumber && (
                    <span className={styles.orderNumber}>{order.orderNumber}</span>
                  )}
                </div>
                
                <div className={styles.serviceDetails}>
                  {order.serviceDetails}
                </div>
                
                <div className={styles.orderDate}>
                  Дата заказа: {new Date(order.orderDate).toLocaleDateString('ru-RU')}
                </div>
                
                <button className={styles.reorderButton}>
                  Повторить заказ
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;