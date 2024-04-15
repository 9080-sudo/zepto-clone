import React from "react";

import classes from "./Order.module.css";
import { Link } from "react-router-dom";

export default function Order({ order, id: orderId }) {
  let { cart, id, time, deliveryTip, status } = order;
  let platfromFee = 2;
  let handlingCharges = 5;
  time = time.toDate();
  const dateString = time.toLocaleDateString();
  const timeString = time.toLocaleTimeString();

  const getName = () => {
    const maxLength = 100;
    let name = "";
    for (let product of cart) {
      name += product.name + ",";
    }
    if (name.length > maxLength) {
      name = name.substring(0, 97) + "...";
    } else {
      name = name.substring(0, name.length - 1);
    }
    return name;
  };

  const totalAmount =
    cart.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.salePrice;
    }, 0) +
    handlingCharges +
    platfromFee +
    deliveryTip;

  const bgColor =
    status === "Pending" ? classes["bg-yellow"] : classes["bg-green"];
  return (
    <li className={classes["order-container"]}>
      <Link to={`/account/orders/${orderId}`} className={classes["link"]}>
        <div className={classes["order-details-container"]}>
          <p className={classes["order-name"]}>{getName()}</p>
          <p>&#x20b9;{totalAmount}</p>
        </div>
        <div className={classes["ordered-date-container"]}>
          <div>
            <p className={classes["order-id"]}>Order #{id}</p>
            <p className={classes["order-date-time"]}>
              {dateString} at {timeString}
            </p>
          </div>
          <p className={`${classes["delivered-descr"]} ${bgColor}`}>{status}</p>
        </div>
      </Link>
    </li>
  );
}
