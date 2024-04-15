import React, { useEffect, useRef, useState } from "react";

import zeptoLogo from "../assets/Header/zepto-logo.svg";

import classes from "./Header.module.css";

import { FaAngleDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

import Login from "./Login/Login";
import { Link } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import { useFirebase } from "../context/Firebase";
import { calculateTotalItems } from "../utils/cart";

const ITEMS = [
  "milk",
  "kurkure",
  "banana",
  "cheese slices",
  "apple juice",
  "amul butter",
];

export default function Header({ pathname }) {
  // const [item, setItem] = useState(ITEMS[0]);

  const [dynamicTextIndex, setDynamicTextIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicTextIndex((prevIndex) => (prevIndex + 1) % ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { cart } = useFirebase();

  const totalItems = calculateTotalItems(cart);
  const totalAmount = cart.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.salePrice;
  }, 0);
  let cartInfo = "Your cart is Empty";
  if (totalItems > 1) {
    cartInfo = `You have ${totalItems} items in your cart. Total ₹${totalAmount}.00`;
  }else if(totalItems === 1){
    cartInfo = `You have ${totalItems} item in your cart. Total ₹${totalAmount}.00`;
  }

  // useEffect(() => {
  //   let index = 1;
  //   const interval = setInterval(() => {
  //     setItem(ITEMS[index]);
  //     index = (index + 1) % ITEMS.length;
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const { isLoggedIn, location, openShowLocation } = useFirebase();

  const isNotProfile = pathname !== "/account";

  return (
    <div className={classes.navbar}>
      <Link to="/">
        <img src={zeptoLogo} alt="zepto-logo" />
      </Link>
      <div className={classes.locationContainer}>
        {location === "" && (
          <p className={classes["select-location"]}>
            Select Location <FaAngleDown className={classes.angleDown} />
          </p>
        )}
        {location !== "" && (
          <>
            <h3>Delivery in 13 minutes</h3>
            <div className={classes.changeLocation} onClick={openShowLocation}>
              <p className={classes.location}>{location}</p>
              <FaAngleDown className={classes.angleDown} />
            </div>
          </>
        )}
      </div>
      <Link
        className={`${classes.searchContainer} ${
          isNotProfile === false ? classes["min-w"] : ""
        }`}
        to="/search"
      >
        <CiSearch />
        <span className={classes.searchFor}>Search for</span>
        <div className={classes["container-div"]}>
          <span className={classes["line"]}>"{ITEMS[dynamicTextIndex]}"</span>
        </div>
      </Link>
      {!isLoggedIn && <Login />}
      {isLoggedIn && isNotProfile && (
        <Link
          to="/account"
          className={`${classes["user-login"]} ${classes["link"]}`}
        >
          <FaRegUserCircle className={classes["user-icon"]} />
          <p>Profile</p>
        </Link>
      )}
      <Link to="/cart" className={classes["cart"]} data-name={cartInfo}>
        <div className={classes["cart-container"]}>
          <IoCartOutline className={classes["cart-icon"]} />
          {totalItems !== 0 && (
            <span className={classes["total-items"]}>{totalItems}</span>
          )}
        </div>
        <p>Cart</p>
      </Link>
    </div>
  );
}

{
  /* <button onClick={() => signOutUser()}>Signout</button> */
}
