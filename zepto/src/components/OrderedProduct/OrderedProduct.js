import React from "react";

import classes from "./OrderedProduct.module.css";

export default function OrderedProduct({ product }) {
  const { salePrice, description, imageUrl, quantity, name } = product;
  console.log(salePrice);
  return (
    <>
      <li className={classes["product"]}>
        <div className={classes["name-img-qty-container"]}>
          <img src={imageUrl} alt={name} className={classes["image"]} />
          <div className={classes['name-qty-container']}>
            <p className={classes['name']}>{name}</p>
            <div className={classes['descr-qty-container']}>
              <p>{description}</p>
              <div className={classes['box']}></div>
              <p>Qty: {quantity}</p>
            </div>
          </div>
        </div>
        <p className={classes['price']}>&#x20b9;{salePrice}</p>
      </li>
      <hr className={classes['line']}/>
    </>
  );
}
