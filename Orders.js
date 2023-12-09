// Orders.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Orders.css';
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersRef = db.collection(`users/${user.uid}/orders`);
          const ordersSnapshot = await ordersRef.orderBy('created', 'desc').get();

          setOrders(
            ordersSnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders__order'>
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
