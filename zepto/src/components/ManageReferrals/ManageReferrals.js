import React from "react";

import classes from "./ManageReferrals.module.css";
import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";
import Refer from "../Refer/Refer";

export default function ManageReferrals() {
  return (
    <div className={classes["referrals-container"]}>
      <AccountMenuSection active="manage referrals" />
      <div className={classes['refer-referrals-container']}>
        <Refer />
      </div>
    </div>
  );
}
