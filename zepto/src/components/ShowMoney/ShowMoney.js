import React, { useState } from "react";

import { useFirebase } from "../../context/Firebase";

import classes from "./ShowMoney.module.css";

import { CiCircleInfo } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

import walletIcon from "../../assets/ShowMoney/wallet-icon.png";
import RedeemVocherModal from "../RedeemVoucherModal/RedeemVocherModal";

export default function ShowMoney() {
  const [showModal, setShowModal] = useState(false)
  const { userDetails } = useFirebase();
  const { transactions } = userDetails;
  
  const calculateTotalAmount = () => {
    const totalAmount = transactions.reduce((a, transaction) => {
      if(transaction.isCredit){
        if(transaction.expiryDate){
          if(transaction.expiryDate.toDate() > new Date()){
            return a + transaction.cash 
          }
          return a 
        }
        return a + transaction.cash 
      }
      return a - transaction.cash 
    } ,0)
    return totalAmount
  }

  return (
    <>
    <div className={classes["money-details-container"]}>
      <div className={classes["money-container"]}>
        <div className={classes["money"]}>
          <p className={classes["cash"]}>&#x20b9;{calculateTotalAmount()}</p>
          <div className={classes["balance-descr-container"]}>
            <span className={classes["balance-descr"]}>Your Balance</span>
            <CiCircleInfo className={classes["circle-info"]} />
          </div>
        </div>
        <img
          src={walletIcon}
          alt="wallet-icon"
          className={classes["wallet-icon"]}
        />
      </div>
      <hr className={classes["line"]} />
      <div className={classes['redeem-voucher-container']} onClick={() => setShowModal(true)}>
        <div className={classes["redeem-voucher-description"]}>
          <FaRegStar className={classes["redeem-icon"]} />
          <span className={classes["redeem-v"]}>Redeem Voucher</span>
        </div>
        <MdKeyboardArrowRight className={classes['right-arrow-icon']}/>
      </div>
    </div>
    {showModal && <RedeemVocherModal closeModal={() => setShowModal(false)}/>}
    </>
  );
}
