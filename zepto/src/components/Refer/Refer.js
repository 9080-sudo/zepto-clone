import React from "react";

import classes from "./Refer.module.css";

import referralHand from "../../assets/Refer/referral-hand.svg";
import shareLogo from "../../assets/Refer/share-circle.svg";
import bag from "../../assets/Refer/shopping-bag-circle.svg";
import rupees from "../../assets/Refer/rupee-circle.svg";
import whatsapp from "../../assets/Refer/whatsapp.svg";
import share from '../../assets/Refer/share.svg'

import { useFirebase } from "../../context/Firebase";

export default function Refer() {
  const { userDetails } = useFirebase();
  const { referralCode } = userDetails;
  return (
    <div className={classes["refer-container"]}>
      <div className={classes["name-image-container"]}>
        <h4 className={classes["get-amount"]}>
          25% off for you, 15% off for them!
        </h4>
        <img
          src={referralHand}
          alt="Referral Hand"
          className={classes["referral-hand-image"]}
        />
      </div>
      <div className={classes["how-it-works-container"]}>
        <h4>How it Works</h4>
        <ul className={classes["list-of-instructions"]}>
          <div className={classes["line"]}></div>
          <li className={classes["instruction"]}>
            <img src={shareLogo} alt="Share Logo" />
            <p className={classes["instruction-para"]}>
              Share the referral link{" "}
              <span className={classes["highlight-span"]}>
                with your friend
              </span>
            </p>
          </li>
          <li className={classes["instruction"]}>
            <img src={bag} alt="Shopping Bag" />
            <p className={classes["instruction-para"]}>
              After your friend places their first order, you
              <span className={classes["highlight-span"]}> get 25% off</span> up
              to ₹200 on your next order
            </p>
          </li>
          <li className={classes["instruction"]}>
            <img src={rupees} alt="Rupees" />
            <p className={classes["instruction-para"]}>
              Upon 10 successful referrals,{" "}
              <span className={classes["highlight-span"]}>you earn ₹2000</span>
            </p>
          </li>
        </ul>
        <a
          href={`https://api.whatsapp.com/send?text=Hey!%20Check%20out%20Zepto%20-%20a%20grocery%20delivery%20app%20that%20delivers%20over%207000%20products%20in%2010%20minutes!%20Use%20my%20code%20${referralCode}%20to%20sign%20up%20and%20get%2015%25%20off%20on%20your%20first%20order.%0ADownload%20now:%20http://localhost:3000/`}
          className={classes['whatsapp-link']}
        >
          <img src={whatsapp} alt="Whatsapp logo" />
          <span className={classes['invite-via-whatsapp']}>Invite via Whatsapp</span>
        </a>
        <button className={classes['share-btn']}>
          <img src={share} alt="Share Logo" />
          <span className={classes['share-invite-link']}>Share Invite Link</span>
        </button>
      </div>
      <hr />
    </div>
  );
}
