import React, { useState } from "react";

import classes from "./AddNewAddress.module.css";
import AddressModal from "../AddressModal/AddressModal";

export default function AddNewAddress() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  console.log('new address')
  return (
    <div className={classes["add-new-address-container"]}>
      <h3>All Saved Addresses</h3>
      <button className={classes["add-btn"]} onClick={() => setShowAddressModal(true)}>Add New Address</button>
      {showAddressModal && <AddressModal closeAddressModal={() => setShowAddressModal(false)} />}
    </div>
  );
}
