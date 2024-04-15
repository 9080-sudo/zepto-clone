import React, { useState } from "react";

import { useFirebase } from "../../context/Firebase";

import classes from "./SelectAddressModal.module.css";

import { CiCirclePlus } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";

import AddressModal from "../AddressModal/AddressModal";

import { getSimplifiedAddresss } from "../../utils/Address";

export default function SelectAddressModal({ closeModal }) {
  const { userDetails, changeSelectedAddress } = useFirebase();
  const { addresses } = userDetails;

  const [showAddAddressModal, setShowAddAddressModal] = useState(false);


  const onClose = () => {
    closeModal();
  };

  const openAddAddressModal = () => {
    // closeModal();
    setShowAddAddressModal(true);
  };

  return (
    <>
      {!showAddAddressModal && (
        <div className={classes["modal-overlay"]} onClick={onClose}>
          <div
            className={classes["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={classes["select-address-container"]}>
              <div>
                <h4 className={classes["select-addr"]}>Select an Address</h4>
                <button
                  className={classes["modal-close-button"]}
                  onClick={onClose}
                >
                  &times;
                </button>
              </div>
              <hr className={classes["line"]} />
              <div className={classes["add-addr-btn-container"]}>
                <button
                  className={classes["add-addr-btn"]}
                  onClick={openAddAddressModal}
                >
                  <CiCirclePlus className={classes["plus-icon"]} />
                  <span className={classes["add-addr"]}>Add Address</span>
                </button>
              </div>
              <hr />
              <div className={classes["saved-addresses-container"]}>
                <p className={classes["saved-addr-heading"]}>SAVED ADDRESSES</p>
                <ul className={classes["list-of-addresses"]}>
                  {addresses.map((address) => (
                    <>
                      <li
                        className={classes["address-container"]}
                        key={address.id}
                        onClick={() => {
                          changeSelectedAddress(getSimplifiedAddresss(address));
                          closeModal()
                        }}
                      >
                        <FaLocationDot className={classes["location-dot"]} />
                        <p className={classes["address"]}>
                          {getSimplifiedAddresss(address)}
                        </p>
                      </li>
                      <hr />
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddAddressModal && (
        <AddressModal
          closeAddressModal={() => {
            setShowAddAddressModal(false);
            closeModal();
          }}
        />
      )}
    </>
  );
}
