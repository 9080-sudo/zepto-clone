import React from "react";
import OrderedProduct from "../OrderedProduct/OrderedProduct";

import classes from './OrderedProducts.module.css'

export default function OrderedProducts({ cart }) {
  return (
    <ul className={classes['products-container']}>
      {cart.map((product) => (
        <OrderedProduct key={product.id} product={product} />
      ))}
    </ul>
  );
}
