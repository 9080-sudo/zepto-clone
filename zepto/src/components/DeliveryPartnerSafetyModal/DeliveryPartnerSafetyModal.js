import React, { useState } from "react";

import deliveryPartner from "../../assets/DeliveryPartnerSafetyModal/zeptonian-riding.png";
import lucideBike from "../../assets/DeliveryPartnerSafetyModal/lucide_bike.png";
import lucideTimer from "../../assets/DeliveryPartnerSafetyModal/lucide_timer.png";
import lucideMegaPhone from "../../assets/DeliveryPartnerSafetyModal/lucide_megaphone.png";

import classes from "./DeliveryPartnerSafetyModal.module.css";

export default function DeliveryPartnerSafetyModal({ onClose }) {
  return (
    <div className={classes["modal-overlay"]} onClick={onClose}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes["delivery-partner-safety-container"]}>
          <img
            src={deliveryPartner}
            alt="Delivery Partner"
            className={classes["delivery-partner"]}
          />
          <h4 className={classes["here-is-how"]}>Here's How We Do It</h4>
          <p className={classes["at-zepto"]}>
            At Zepto, Rider's safety is our responsibility
          </p>
        </div>
        <div className={classes["delivery-partner-tips"]}>
          <img
            src={lucideTimer}
            alt="lucide-timer"
            className={classes["icon"]}
          />
          <p className={classes["delivery-safety"]}>
            Delivery partners ride safely at an average speed of 15kmph per
            delivery
          </p>
        </div>
        <div className={classes["delivery-partner-tips"]}>
          <img src={lucideBike} alt="lucide-bike" className={classes["icon"]} />
          <p className={classes["delivery-safety"]}>
            No penalties for late deliveries & no incentives for on-time
            deliveries
          </p>
        </div>
        <div className={classes["delivery-partner-tips"]}>
          <img
            src={lucideMegaPhone}
            alt="lucide-mega-phone"
            className={classes["icon"]}
          />
          <p className={classes["delivery-safety"]}>
            Delivery partners are not informed about promised delivery time
          </p>
        </div>
        <button onClick={onClose} className={classes['close-btn']}>Close</button>
      </div>
    </div>
  );
}
