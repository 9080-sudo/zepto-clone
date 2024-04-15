import React from "react";

import { useFirebase } from "../../context/Firebase";

import classes from './ProductNamePriceDetails.module.css'

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

export default function ProductNamePriceDetails({
  id,
  name,
  actualPrice,
  salePrice,
  description,
  imageUrl
}) {
  const discount = Math.round(((actualPrice - salePrice) / actualPrice) * 100);
  const { cart, addItemToCart } = useFirebase();
  let existingProductIdx = cart.findIndex((product) => {
    // console.log("at product details", productId, product.id);
    return product.id === id;
  });
  let qty = 0;
  if (existingProductIdx !== -1) {
    qty = cart[existingProductIdx].quantity;
  }

  return (
    <div>
      <h3 className={classes['name']}>{name}</h3>
      <p className={classes['description']}>{description}</p>
      <div className={classes['money']}>
        <h4 className={classes['sale-price']}>&#x20b9;{salePrice}</h4>
        <p className={classes['actual-price']}>&#x20b9;{actualPrice}</p>
        {discount !== 0 && <p className={classes['discount']}>{discount}% Off</p>}
      </div>
      {qty === 0 && (
            <button
              className={classes["add-btn"]}
              onClick={(e) => {
                e.preventDefault();
                addItemToCart(id, {name, description, actualPrice, salePrice, id, imageUrl}, 1);
              }}
            >
              Add
            </button>
          )}
          {qty !== 0 && (
            <div className={classes["change-quantity-container"]}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItemToCart(id, {name, description, actualPrice, salePrice, id, imageUrl}, -1);
                }}
                className={classes["change-quantity-btn"]}
              >
                <FaMinus />
              </button>
              <span className={classes["qty"]}>{qty}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItemToCart(id, {name, description, actualPrice, salePrice, id, imageUrl}, 1);
                }}
                className={classes["change-quantity-btn"]}
              >
                <FaPlus />
              </button>
            </div>
          )}
          <hr className={classes['line']}/>
    </div>
  );
}
