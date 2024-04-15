import React from "react";

import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";

import classes from "./Wallet.module.css";
import ShowMoney from "../ShowMoney/ShowMoney";
import RecentWalletActivity from "../RecentWalletActivity/RecentWalletActivity";

export default function Wallet() {
  return (
    <div className={classes["wallet-container"]}>
      <AccountMenuSection active="wallet" />
      <div className={classes["money-details-container"]}>
        <div className={classes["gradient"]}></div>
        <ShowMoney />
        <RecentWalletActivity />
      </div>
    </div>
  );
}
