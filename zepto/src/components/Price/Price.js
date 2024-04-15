import React from "react";

import { useFirebase } from "../../context/Firebase";

import classes from "./Price.module.css";

export default function Price() {
  const { cart, deliveryTip } = useFirebase();

  const totalAmountAfterCut = cart.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.salePrice;
  }, 0);

  const totalAmountBeforeCut = cart.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.actualPrice;
  }, 0);

  return (
    <div className={classes["price-container"]}>
      <div className={classes["specific-price-container"]}>
        <p>Item Total</p>
        <div>
          <span className={classes["price-before-cut"]}>
            &#x20b9;{totalAmountBeforeCut}
          </span>
          <span className={classes["price-after-cut"]}>
            &#x20b9;{totalAmountAfterCut}
          </span>
        </div>
      </div>
      <div
        className={`${classes["specific-price-container"]} ${classes["font-s"]}`}
      >
        <p className={classes["price-description"]}>Handling Charge</p>
        <div>
          <span className={classes["price-before-cut"]}>&#x20b9;15</span>
          <span
            className={`${classes["price-after-cut"]} ${classes["color-green"]}`}
          >
            &#x20b9;5
          </span>
        </div>
      </div>
      <div
        className={`${classes["specific-price-container"]} ${classes["font-s"]}`}
      >
        <p className={classes["price-description"]}>Platform Fee</p>
        <div>
          <span className={classes["font-c"]}>&#x20b9;2</span>
        </div>
      </div>
      <div
        className={`${classes["specific-price-container"]} ${classes["font-s"]}`}
      >
        <p className={classes["price-description"]}>Delivery Fee</p>
        <div>
          <span className={classes["price-before-cut"]}>&#x20b9;25</span>
          <span
            className={`${classes["price-after-cut"]} ${classes["color-green"]}`}
          >
            &#x20b9;0
          </span>
        </div>
      </div>
      {deliveryTip > 0 && (
        <div
          className={`${classes["specific-price-container"]} ${classes["font-s"]}`}
        >
          <p className={classes["price-description"]}>Delivery Partner tip</p>
          <div>
            <span
              className={`${classes["price-after-cut"]} ${classes['delivery-tip']}`}
            >
              &#x20b9;{deliveryTip}
            </span>
          </div>
        </div>
      )}
      <div className={`${classes["specific-price-container"]}`}>
        <p>To Pay</p>
        <div>
          <span className={classes["total-price"]}>
            &#x20b9;{totalAmountAfterCut + 5 + 2 + deliveryTip}
          </span>
        </div>
      </div>
      <hr className={classes["hr-line"]} />
    </div>
  );
}
