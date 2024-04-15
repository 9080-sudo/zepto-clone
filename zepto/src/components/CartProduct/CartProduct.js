import React from "react";

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

import classes from "./CartProduct.module.css";
import { useFirebase } from "../../context/Firebase";

export default function CartProduct({ cartProduct, id }) {
  const { name, description, actualPrice, salePrice, quantity, imageUrl } =
    cartProduct;
  const { addProductToCart } = useFirebase();
  return (
    <li className={classes["cart-product-container"]}>
      <div className={classes['cart-product']}>
        <div className={classes["product-details-container"]}>
          <img
            src={imageUrl}
            alt={name}
            className={classes["cart-product-image"]}
          />
          <div className={classes["name-description-container"]}>
            <div>
              <p className={classes["name"]}>{name}</p>
              <p className={classes["description"]}>{description}</p>
            </div>
            <div className={classes["price-container"]}>
              <span className={classes["sale-price"]}>&#x20b9;{salePrice*quantity}</span>
              <span className={classes["actual-price"]}>
                &#x20b9;{actualPrice*quantity}
              </span>
            </div>
          </div>
        </div>
        <div className={classes["btns-container"]}>
          <button
            className={classes["btn"]}
            onClick={() => addProductToCart(id, cartProduct, -1)}
          >
            <FaMinus />
          </button>
          <span>{quantity}</span>
          <button
            className={classes["btn"]}
            onClick={() => addProductToCart(id, cartProduct, 1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <hr />
    </li>
  );
}
