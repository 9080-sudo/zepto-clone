import React from "react";
import classes from "./NotLoggedInCart.module.css";
import CartLoginPreview from "../CartLoginPreview/CartLoginPreview";

export default function NotLoggedInCart() {
  return (
    <div className={classes["cart-without-login-container"]}>
      <h3 className={classes["please-login-heading"]}>Please Login</h3>
      <p className={classes["please-login-para"]}>
        Please login to access cart
      </p>
      <CartLoginPreview />
    </div>
  );
}
