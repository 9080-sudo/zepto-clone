import React from "react";
import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";

import classes from "./Addresses.module.css";
import { useFirebase } from "../../context/Firebase";
import NoAddressAdded from "../NoAddressAdded/NoAddressAdded";
import AddNewAddress from "../AddNewAddress/AddNewAddress";
import Address from "../Address/Address";

export default function Addresses() {
  const { userDetails } = useFirebase();
  const { addresses } = userDetails;
  console.log(addresses);
  return (
    <div className={classes["addresses-container"]}>
      <AccountMenuSection active="addresses" />
      <div className={classes['add-remove-container']}>
        <AddNewAddress />
        {(addresses === undefined || addresses.length === 0) && (
          <NoAddressAdded />
        )}

        {addresses !== undefined && addresses.length > 0 && addresses.map(address => <Address key={address.id} address={address}/>)}
      </div>
    </div>
  );
}
