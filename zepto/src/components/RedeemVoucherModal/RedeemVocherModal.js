import React, { useState } from "react";

import classes from "./RedeemVoucherModal.module.css";
import { useFirebase } from "../../context/Firebase";

export default function RedeemVocherModal({ closeModal }) {
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherCodeErr, setVoucherCodeErr] = useState("");

  const { redeemVoucher } = useFirebase();

  const redeemVoucherHere = async () => {
    const res = await redeemVoucher(voucherCode);
    if (res !== "") {
    //   console.log(res);
      setVoucherCodeErr(res);
      return 
    }
    setVoucherCode('')
    closeModal()
  };

  return (
    <div className={classes["modal-overlay"]} onClick={closeModal}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes["modal-close-button"]} onClick={closeModal}>
          &times;
        </button>
        <div className={classes["redeem-voucher-container"]}>
          <div className={classes["redeem-vocuher-description-container"]}>
            <h3>Redeem Voucher</h3>
            <p className={classes["descr"]}>
              Enter the voucher code and redeem it on your next purchase!
            </p>
          </div>
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => {
              setVoucherCode(e.target.value);
              setVoucherCodeErr("");
            }}
            className={`${classes["redeem-code"]} ${
              voucherCodeErr !== "" ? classes["err-input"] : ""
            }`}
            placeholder="Enter Voucher Code"
          />
          <p className={classes["err"]}>{voucherCodeErr}</p>
          <button
            className={` ${classes["btn"]} ${
              voucherCode === ""
                ? classes["not-entered-btn"]
                : classes["entered-btn"]
            }`}
            disabled={voucherCode === ""}
            onClick={redeemVoucherHere}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}
