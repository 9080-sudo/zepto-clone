import React from "react";

import { useFirebase } from "../../context/Firebase";

import CartProduct from "../CartProduct/CartProduct";

import classes from './CartProducts.module.css'

export default function CartProducts() {
  const { cart } = useFirebase();
  return <ul className={classes['cart-products-container']}>{
    cart.map(cartProduct => <CartProduct key={cartProduct.id} id={cartProduct.id} cartProduct={cartProduct} />)}</ul>;
}
