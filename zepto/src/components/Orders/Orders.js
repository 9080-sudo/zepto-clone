import React, { useEffect, useState } from "react";
import classes from "./Orders.module.css";
import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";
import { useFirebase } from "../../context/Firebase";
import NoOrdersFound from "../NoOrdersFound/NoOrdersFound";
import Order from "../Order/Order";

export default function Orders() {
  // const { userDetails } = useFirebase();
  // const { orders } = userDetails;
  const [orders, setOrders] = useState([]);
  const { getOrders } = useFirebase();

  useEffect(() => {
    const getOrdersHere = async () => {
      let ordersHere = await getOrders();
      ordersHere.sort((o1, o2) => o2[1].time.toDate() - o1[1].time.toDate())
      console.log(ordersHere)
      ordersHere = ordersHere.map(order => {
        if(order[1].timeToShowOrder.toDate() < new Date()){
          return [order[0], {...order[1], status: 'Delivered'}]
        }
        return [order[0], {...order[1], status: 'Pending'}]
      })
      // ordersHere = ordersHere.filter(order => {
      //   return order[1].timeToShowOrder.toDate() < new Date()})
      console.log(ordersHere);
      setOrders(ordersHere);
    };
    getOrdersHere();
  }, [getOrders]);

  return (
    <div className={classes["orders-container"]}>
      <AccountMenuSection active="orders" />
      <div className={classes["show-orders-container"]}>
        {orders.length === 0 && <NoOrdersFound />}
        {orders.length > 0 && (
          <ul className={classes['orders']}>
            {orders.map((order) => (
              <Order key={order[0]} order={order[1]} id={order[0]} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
