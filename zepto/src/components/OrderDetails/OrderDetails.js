import React, { useEffect, useState } from "react";

import { useFirebase } from "../../context/Firebase";

import { Link, useParams } from "react-router-dom";

import classes from "./OrderDetails.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";
import OrderIdTime from "../OrderIdTime/OrderIdTime";
import OrderedProducts from "../OrderedProducts/OrderedProducts";
import OrderPrice from "../OrderPrice/OrderPrice";

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const { getOrder } = useFirebase();
  const { orderId } = useParams();
  useEffect(() => {
    const getOrderHere = async () => {
      let orderHere = await getOrder(orderId);
      if(orderHere.timeToShowOrder.toDate() < new Date()){
        orderHere = {...orderHere, status: 'Delivered'}
      }else{
        orderHere = {...orderHere, status: 'Pending'}
      }
      console.log(orderHere);
      setOrder(orderHere);
    };
    getOrderHere();
  }, [getOrder, orderId]);
  // console.log(order.deliveryTip, order)
  return (
    <div className={classes["orders-container"]}>
      <AccountMenuSection active="orders" />
      {order && (
        <div className={classes["order-details-container"]}>
          <Link to={`/account/orders`} className={classes["back-link"]}>
            <FaArrowLeftLong />
          </Link>
          <OrderIdTime
            time={order.time}
            id={order.id}
            status={order.status}
            // temp={console.log(order)}
          />
          <OrderedProducts cart={order.cart} />
          <OrderPrice cart={order.cart} deliveryTip={order.deliveryTip}/>
        </div>
      )}
    </div>
  );
}
