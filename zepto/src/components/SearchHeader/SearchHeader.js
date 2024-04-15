import React, { useEffect, useRef, useState } from "react";

import zeptoLogo from "../../assets/Header/zepto-logo.svg";

import classes from "./SearchHeader.module.css";

import { FaAngleDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

import Login from "../Login/Login";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { calculateTotalItems } from "../../utils/cart";

export default function SearchHeader({ search, setSearch }) {
  const { isLoggedIn, location, openShowLocation, cart } = useFirebase();
  const totalItems = calculateTotalItems(cart);
  const totalAmount = cart.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.salePrice;
  }, 0);
  let cartInfo = "Your cart is Empty";
  if (totalItems > 0) {
    cartInfo = `You have ${totalItems} items in your cart. Total ₹${totalAmount}.00`;
  }
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
      <div className={classes["search-container"]}>
        <CiSearch />
        <input
          type="text"
          placeholder="Search for over 5000 products"
          className={classes["input"]}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
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
