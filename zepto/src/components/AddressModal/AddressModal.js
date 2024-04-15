import React, { useState } from "react";

import classes from "./AddressModal.module.css";
import { useFirebase } from "../../context/Firebase";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function AddressModal({ closeAddressModal }) {
  const [houseNo, setHouseNo] = useState("");
  const [houseNoErr, setHouseNoErr] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [buildingNoErr, setBuildingNoErr] = useState("");
  const [landMark, setLandMark] = useState("");
  const [landMarkErr, setLandMarkErr] = useState("");
  const [addressLabel, setAddressLabel] = useState("");
  const [addressLabelErr, setAddressLabelErr] = useState("");
  const [showOther, setShowOther] = useState(false);

  console.log("hi");
  const { addAddress, userDetails } = useFirebase();
  const { addresses } = userDetails;

  const isHomeAddressDisabled = addresses.find(
    (address) => address.addressLabel === "Home"
  );
  const isWorkAddressDisabled = addresses.find(
    (address) => address.addressLabel === "Work"
  );

  const getClassName = (isDisabled, addresLbl) => {
    let addressLblClassName = classes["not-selected-btn"];
    if (isDisabled) {
      addressLblClassName = classes["disabled-btn"];
    } else if (addresLbl === addressLabel) {
      addressLblClassName = classes["selected-btn"];
    } else if (showOther === true && addresLbl === "Other") {
      addressLblClassName = classes["selected-btn"];
    }
    return addressLblClassName;
  };

  let homeAddressLabelClassName = `${classes["generic-btn"]} ${getClassName(
    isHomeAddressDisabled,
    "Home"
  )}`;
  let workAddressLabelClassName = `${classes["generic-btn"]} ${getClassName(
    isWorkAddressDisabled,
    "Work"
  )}`;
  let otherAddressLabelClassName = `${classes["generic-btn"]} ${getClassName(
    false,
    "Other"
  )}`;

  const closeModal = () => {
    setHouseNo("");
    setBuildingNo("");
    setLandMark("");
    setHouseNoErr("");
    setBuildingNoErr("");
    setLandMarkErr("");
    closeAddressModal();
  };

  const handleHouseNoBlur = () => {
    if (houseNo === "") {
      setHouseNoErr("*Required");
    } else {
      setHouseNoErr("");
    }
  };

  const handleBuildingNoBlur = () => {
    if (buildingNo === "") {
      setBuildingNoErr("*Required");
    } else {
      setBuildingNoErr("");
    }
  };

  const handleLandMarkBlur = () => {
    if (landMark === "") {
      setLandMarkErr("*Required");
    } else {
      setLandMarkErr("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flag = false;

    if (buildingNo === "") {
      setBuildingNoErr("*Required");
      flag = true;
    }

    if (houseNo === "") {
      setHouseNoErr("*Required");
      flag = true;
    }

    if (landMark === "") {
      setLandMarkErr("*Required");
      flag = true;
    }

    if (addressLabel === "") {
      setAddressLabelErr("*Required");
      flag = true;
    }else{
      setAddressLabelErr("")
    }

    if (flag) return;

    await addAddress(houseNo, buildingNo, landMark, addressLabel);
    closeModal();
  };

  return (
    <div className={classes["modal-overlay"]} onClick={closeModal}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <form className={classes["form-container"]} onSubmit={handleSubmit}>
          <h3>Enter Location Information</h3>
          <div className={classes["input-container"]}>
            <label htmlFor="House Number" className={classes["input-label"]}>
              House No. & Floor*
            </label>
            <input
              type="text"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              id="House Number"
              className={classes["input-element"]}
              placeholder="Enter details"
              onBlur={handleHouseNoBlur}
            />
            <p className={classes["err"]}>{houseNoErr}</p>
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="Building Number" className={classes["input-label"]}>
              Building & Block No.*
            </label>
            <input
              type="text"
              value={buildingNo}
              onChange={(e) => setBuildingNo(e.target.value)}
              placeholder="Enter details"
              id="Building Number"
              className={classes["input-element"]}
              onBlur={handleBuildingNoBlur}
            />
            <p className={classes["err"]}>{buildingNoErr}</p>
          </div>
          <div className={classes["input-container"]}>
            <label htmlFor="LandMark" className={classes["input-label"]}>
              Landmark & Area Name
            </label>
            <input
              type="text"
              value={landMark}
              onChange={(e) => setLandMark(e.target.value)}
              placeholder="Enter details"
              id="LandMark"
              className={classes["input-element"]}
              onBlur={handleLandMarkBlur}
            />
            <p className={classes["err"]}>{landMarkErr}</p>
          </div>
          <div>
            <label className={classes["input-label"]}>Add Address Label</label>
            <div className={classes["address-lbl-btns-container"]}>
              <button
                type="button"
                disabled={isHomeAddressDisabled}
                onClick={() => {
                  setAddressLabel("Home");
                  setShowOther(false);
                }}
                className={homeAddressLabelClassName}
              >
                Home
              </button>
              <button
                type="button"
                disabled={isWorkAddressDisabled}
                onClick={() => {
                  setAddressLabel("Work");
                  setShowOther(false);
                }}
                className={workAddressLabelClassName}
              >
                Work
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOther(true);
                  setAddressLabel("");
                }}
                className={otherAddressLabelClassName}
              >
                Other
              </button>
            </div>
            {showOther && (
              <input
                type="text"
                value={addressLabel}
                onChange={(e) => setAddressLabel(e.target.value)}
                placeholder="Enter your own label"
                className={classes["input-element"]}
              />
            )}
            <p className={classes["err"]}>{addressLabelErr}</p>
          </div>
          <button type="submit" className={classes["save-continue-btn"]}>
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
