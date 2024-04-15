import React, { useState } from "react";

import locationPin from "../../assets/AddAddress/location-pin.svg";

import classes from "./AddAddress.module.css";
import AddressModal from "../AddressModal/AddressModal";

export default function AddAddress() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  return (
    <div>
      <div className={classes["enter-address-container"]}>
        <img
          src={locationPin}
          alt="Location Pin"
          className={classes["location-pin"]}
        />
        <p>Enter your delivery address</p>
      </div>
      <button
        className={classes["add-address-btn"]}
        onClick={() => setShowAddressModal(true)}
      >
        Add Address To Proceed
      </button>
      {showAddressModal && (
        <AddressModal closeAddressModal={() => setShowAddressModal(false)} />
      )}
    </div>
  );
}
