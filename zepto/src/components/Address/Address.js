import React, { useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import classes from "./Address.module.css";
import EditAddressModal from "../EditAddressModal/EditAddressModal";
import DeleteAddressModal from "../DeleteAddressModal/DeleteAddressModal";

export default function Address({ address }) {
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { houseNo, buildingNo, landMark, addressLabel } = address;
  const completeAddress = `${houseNo}, ${buildingNo}, ${landMark}`;
  return (
    <>
      <div className={classes["address-container"]}>
        <div className={classes["address-name-container"]}>
          <CiLocationOn className={classes["location-icon"]} />
          <div>
            <h4 className={classes['address-label']}>{addressLabel}</h4>
            <p className={classes["address-name"]}>{completeAddress}</p>
          </div>
        </div>
        <div className={classes["address-edit-container"]}>
          <MdOutlineModeEdit
            className={classes["edit-icon"]}
            onClick={() => setShowEditAddressModal(true)}
          />
          <RiDeleteBinLine
            className={classes["delete-icon"]}
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
      </div>
      <hr className={classes["line"]} />
      {showEditAddressModal && (
        <EditAddressModal
          closeEditAddressModal={() => setShowEditAddressModal(false)}
          houseNo={houseNo}
          buildingNo={buildingNo}
          landMark={landMark}
          addressLabel={addressLabel}
          id={address.id}
        />
      )}
      {showDeleteModal && (
        <DeleteAddressModal
          closeDeleteAddressModal={() => setShowDeleteModal(false)}
          id={address.id}
        />
      )}
    </>
  );
}
