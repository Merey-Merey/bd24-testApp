import React from "react";
import styles from "./OrdersSection.module.scss";

const orders = [
  { id: 1, name: "Счета на оплату для Юр. Лиц", file: "file1.pdf", image: "/images/заказ1.png" },
  { id: 2, name: "Гарантия на детали для переднего бампера", file: "file2.pdf", image: "/images/заказ2.png" },
  { id: 3, name: "Чеки для Физ.лиц", file: "file3.pdf", image: "/images/заказ4.png" },
];

const OrdersSection: React.FC = () => {
  return (
    <div className={styles.ordersSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.line}></span> Заказы
      </h2>

      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order.id} className={styles.card}>
            <img src={order.image} alt={order.name} className={styles.cardImage} />

            <p className={styles.cardTitle}>{order.name}</p>

            <button className={styles.downloadBtn}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979 15.804 0.587 15.412C0.195 15.02 -0.000666667 14.5493 0 14V11H2V14H14V11H16V14C16 14.55 15.804 15.021 15.412 15.413C15.02 15.805 14.5493 16.0007 14 16H2Z"
                  fill="white"
                />
              </svg>
              Скачать
            </button>
          </div>
        ))}
      </div>

      <div className={styles.sliderDots}>
        <span className={`${styles.dot} ${styles.active}`}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default OrdersSection;