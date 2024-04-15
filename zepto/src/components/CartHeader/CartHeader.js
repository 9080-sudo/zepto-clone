import React, { useEffect, useRef, useState } from "react";

import zeptoLogo from "../../assets/Header/zepto-logo.svg";

import classes from "./CartHeader.module.css";

import { FaAngleDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

import Login from "../Login/Login";
import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import { useFirebase } from "../../context/Firebase";

const ITEMS = [
  "milk",
  "kurkure",
  "banana",
  "cheese slices",
  "apple juice",
  "amul butter",
];

export default function CartHeader() {
  // const [item, setItem] = useState(ITEMS[0]);

  // useEffect(() => {
  //   let index = 1;
  //   const interval = setInterval(() => {
  //     setItem(ITEMS[index]);
  //     index = (index + 1) % ITEMS.length;
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const [dynamicTextIndex, setDynamicTextIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicTextIndex((prevIndex) => (prevIndex + 1) % ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { isLoggedIn, location, openShowLocation } = useFirebase();

  return (
    <div className={classes.navbar}>
      <Link to="/">
        <img src={zeptoLogo} alt="zepto-logo" />
      </Link>
      <div className={classes.locationContainer}>
        {location === "" && (
          <p className={classes['select-location']}>
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
      <Link className={classes.searchContainer} to="/search">
        <CiSearch />
        <span className={classes.searchFor}>Search for</span>
        <div className={classes["container-div"]}>
          <span className={classes["line"]}>"{ITEMS[dynamicTextIndex]}"</span>
        </div>
      </Link>
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
    </div>
  );
}
