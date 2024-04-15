import React from "react";

import classes from "./OrderIdTime.module.css";

export default function OrderIdTime({ time, id, status }) {
  time = time.toDate();
  const dateString = time.toLocaleDateString();
  const timeString = time.toLocaleTimeString();
  const bgColor =
    status === "Pending" ? classes["bg-yellow"] : classes["bg-green"];
  return (
    <div className={classes["order-id-time-container"]}>
      <div>
        <p className={classes["order-id"]}>ORDER ID: {id}</p>
        <p className={classes["order-time"]}>
          {dateString} at {timeString}
        </p>
      </div>
      <p className={`${classes["delivered-descr"]} ${bgColor}`}>{status}</p>
    </div>
  );
}
