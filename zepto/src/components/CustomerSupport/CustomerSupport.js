import React from "react";

import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";

import classes from './CustomerSupport.module.css'
import FAQS from "../FAQS/FAQS";

export default function CustomerSupport() {
  return (
    <div className={classes["support-container"]}>
      <AccountMenuSection active="customer support" />
      <FAQS />
    </div>
  );
}
