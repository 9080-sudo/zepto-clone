import React, { useEffect } from "react";

import classes from "./Cart.module.css";
import CartHeader from "../CartHeader/CartHeader";
import { useFirebase } from "../../context/Firebase";
import NotLoggedInCart from "../NotLoggedInCart/NotLoggedInCart";
import Location from "../Location/Location";
import CartContainer from "../CartContainer/CartContainer";
import EmptyCart from "../EmptyCart/EmptyCart";

export default function Cart() {
  const { isLoggedIn, showLocation, cart } = useFirebase();

  useEffect(() => {
    document.title = 'Cart | Zepto'
  },[])


  return (
    <>
      <CartHeader />
      {showLocation && <Location />}
      {!isLoggedIn && <NotLoggedInCart />}
      {isLoggedIn && cart.length === 0 && <EmptyCart />}
      {isLoggedIn && cart.length > 0 && <CartContainer />}
    </>
  );
}
