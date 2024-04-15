import React from "react";

import { CiGift } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

import classes from "./Transaction.module.css";

export default function Transaction({ transaction }) {
  let { cash, expiryDate, name, isCredit, time, isVoucherRedeemed } =
    transaction;
  if (expiryDate) {
    expiryDate = expiryDate.toDate();
  }
  time = time.toDate();
  const dateString = time.toLocaleDateString();
  const timeString = time.toLocaleTimeString();

  return (
    <div className={classes["transaction-container"]}>
      <div className={classes["transaction-details-container"]}>
        {isVoucherRedeemed && <CiGift className={classes["gift-icon"]} />}
        <div className={classes["transation-name-container"]}>
          <p className={classes["transaction-name"]}>{name}</p>
          <p className={classes["transaction-time"]}>
            {dateString} at {timeString}
          </p>
        </div>
      </div>
      <div>
        <p className={`${classes['money']} ${isCredit ? classes['credit']: classes['debit']}`}>
          {isCredit ? <FaPlus /> : <FaMinus />}
          <span>&#x20b9;{cash}</span>
        </p>
        <p className={classes['expiry-date']}>Expires {expiryDate.toLocaleDateString()}</p>
      </div>
    </div>
  );
}
