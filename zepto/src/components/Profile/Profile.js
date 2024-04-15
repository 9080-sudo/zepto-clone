import React from "react";

import classes from './Profile.module.css'
import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";
import ProfileDetails from "../ProfileDetails/ProfileDetails";

export default function Profile() {
  return (
    <div className={classes["profile-container"]}>
      <AccountMenuSection active="profile" />
      <ProfileDetails />
    </div>
  );
}
