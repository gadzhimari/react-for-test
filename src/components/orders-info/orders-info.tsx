import React, { FC } from 'react';
import styles from './orders-info.module.css';
import { useSelector } from 'react-redux';
import { TIngredient } from '../../utils/types';

const HalfColumn: FC<{
  ordersNumbers: any;
  title: string;
  textColor?: string;
}> = ({ ordersNumbers, title, textColor }) => {
  return (
    <div className={`pr-6 ${styles.column}`}>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
      <ul className={`pt-6  ${styles.list}`}>
        {ordersNumbers.map((item: number, index: number) => {
          return (
            <li
              className={`text text_type_digits-default ${styles.list_item}`}
              style={{ color: textColor === 'blue' ? '#00cccc' : '#F2F2F3' }}
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Column: FC<{ title: string; content: any }> = ({ title, content }) => {
  return (
    <>
      <h3 className={`pt-15 text text_type_main-medium ${styles.title}`}>
        {title}:
      </h3>
      <p className={`text text_type_digits-large ${styles.content}`}>
        {content}
      </p>
    </>
  );
};

function OrdersInfo() {
  type TOrder = {
    createdAt?: string;
    ingredients?: string[];
    name?: string;
    number: number;
    status?: string;
    updatedAt?: string;
    ingredientsInfo?: TIngredient[];
    _id?: string;
  };

  type TOrdersNumbers = any;
  const getOrders = (orders: TOrder[], status: string): TOrdersNumbers => {
    const numbers = orders.map((element) => {
      if (element.status === status) {
        return element.number;
      }
    });
    if (numbers.length > 20) {
      return numbers.slice(0, 20);
    }
    return numbers;
  };

  const total = useSelector<any>((state) => state.ws.total);
  const totalToday = useSelector<any>((state) => state.ws.totalToday);
  const ready = useSelector<any>((state) => getOrders(state.ws.orders, 'done'));
  const preparing = useSelector<any>((state) =>
    getOrders(state.ws.orders, 'pending')
  );

  return (
    <section className={`p-10 ${styles.section}`}>
      <div className={styles.columns}>
        <HalfColumn ordersNumbers={ready} title={'????????????'} textColor={'blue'} />
        <HalfColumn ordersNumbers={preparing} title={'?? ????????????'} />
      </div>
      <Column title={'?????????????????? ???? ?????? ??????????'} content={total} />
      <Column title={'?????????????????? ???? ??????????????'} content={totalToday} />
    </section>
  );
}

export default OrdersInfo;
