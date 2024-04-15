import React from "react";

import emptyCart from "../../assets/Cart/empty-bag.png";

import { Link } from "react-router-dom";

import classes from './EmptyCart.module.css'
export default function EmptyCart() {
  return (
    <div className={classes["empty-cart"]}>
      <img src={emptyCart} alt="Empty Cart" className={classes['empty-cart-img']}/>
      <p className={classes['description']}>Your cart is Empty</p>
      <Link to='/' className={classes['browse-products-link']}>Browse Products</Link>
    </div>
  );
}
