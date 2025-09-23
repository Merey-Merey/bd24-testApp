import React from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import styles from './Payments.module.scss';

interface Payment {
  id: number;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: string;
}

const PaymentsPage: React.FC = () => {
  const payments: Payment[] = [
    { id: 1, invoiceNumber: '321312321', date: '2024-01-15', amount: '50 000 ₸', status: 'Не оплачен' },
    { id: 2, invoiceNumber: '321312321', date: '2024-01-16', amount: '25 000 ₸', status: 'Оплачен' },
    { id: 3, invoiceNumber: '321312321', date: '2024-01-17', amount: '70 000 ₸', status: 'Оплачен' },
    { id: 4, invoiceNumber: '321312321', date: '2024-01-18', amount: '15 000 ₸', status: 'Оплачен' },
    { id: 2, invoiceNumber: '321312321', date: '2024-01-16', amount: '25 000 ₸', status: 'Оплачен' },
    { id: 3, invoiceNumber: '321312321', date: '2024-01-17', amount: '70 000 ₸', status: 'Оплачен' },
    { id: 4, invoiceNumber: '321312321', date: '2024-01-18', amount: '15 000 ₸', status: 'Оплачен' },
    { id: 2, invoiceNumber: '321312321', date: '2024-01-16', amount: '25 000 ₸', status: 'Оплачен' },
    { id: 3, invoiceNumber: '321312321', date: '2024-01-17', amount: '70 000 ₸', status: 'Оплачен' },
    { id: 4, invoiceNumber: '321312321', date: '2024-01-18', amount: '15 000 ₸', status: 'Оплачен' },
  ];

  return (
    <>
      <Head>
        <title>Платежи</title>
        <meta name="description" content="Страница платежей" />
      </Head>

      <Header />

      <div className={styles.page}>
        <h1 className={styles.title}>Платежи</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Номер счета</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Статус</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.invoiceNumber}</td>
                <td>{new Date(payment.date).toLocaleDateString('ru-RU')}</td>
                <td>{payment.amount}</td>
                <td className={payment.status === 'Оплачен' ? styles.statusPaid : styles.statusUnpaid}>
  {payment.status}
</td>

                <td>
                  {payment.status === 'Не оплачен' && (
                    <button className={styles.payButton}>Оплатить</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentsPage;
