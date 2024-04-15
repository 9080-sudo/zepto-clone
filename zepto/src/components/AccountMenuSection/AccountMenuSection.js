import React from "react";

import { useFirebase } from "../../context/Firebase";

import classes from "./AccountMenuSection.module.css";

import { BsHandbag } from "react-icons/bs";
import { PiChatTeardropTextLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiWallet } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export default function AccountMenuSection({active}) {
  const { user, signOutUser } = useFirebase();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOutUser();
    navigate("/");
  };
  
  return (
    <div className={classes["side-container"]}>
      <h3>My Account</h3>
      <p className={classes["email"]}>{user.email}</p>
      <hr className={classes["hr-line"]} />
      <Link to="/account/orders" className={` ${classes["specific-section"]} ${active === 'orders'? classes['active-link']: ''}`}>
        <BsHandbag className={classes["specific-section-icon"]} />
        <p className={classes["specific-section-description"]}>Orders</p>
      </Link>
      <Link to="/account/support" className={` ${classes["specific-section"]} ${active === 'customer support'? classes['active-link']: ''}`}>
        <PiChatTeardropTextLight className={classes["specific-section-icon"]} />
        <p className={classes["specific-section-description"]}>
          Customer Support
        </p>
      </Link>
      <Link to="/account/referrals" className={` ${classes["specific-section"]} ${active === 'manage referrals'? classes['active-link']: ''}`}>
        <FaRegHeart className={classes["specific-section-icon"]} />
        <p className={classes["specific-section-description"]}>
          Manage Referrals
        </p>
      </Link>
      <Link to='/account/addresses' className={` ${classes["specific-section"]} ${active === 'addresses'? classes['active-link']: ''}`}>
        <GrLocation className={classes["specific-section-icon"]} />
        <p className={classes["specific-section-description"]}>Addresses</p>
      </Link>
      <Link to='/account/profile' className={` ${classes["specific-section"]} ${active === 'profile'? classes['active-link']: ''}`}>
        <FaRegCircleUser className={classes["specific-section-icon"]} />
        <p className={classes["specific-section-description"]}>Profile</p>
      </Link>
      <Link to='/account/wallet' className={` ${classes["specific-section"]} ${active === 'wallet'? classes['active-link']: ''}`}>
        <PiWallet className={classes["specific-section-icon"]} />
        <p className={classes["specific-section-description"]}>Wallet</p>
      </Link>
      <hr className={classes["hr-line"]} />
      <div className={classes["logout-btn-container"]}>
        <button onClick={handleLogout} className={classes["logout-btn"]}>Log Out</button>
      </div>
    </div>
  );
}
