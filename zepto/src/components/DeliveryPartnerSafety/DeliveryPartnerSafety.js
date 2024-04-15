import React, { useState } from "react";

import deliveryPartner from "../../assets/DeliveryPartnerSafety/delivery-partner.png";

import classes from "./DeliveryPartnerSafety.module.css";
import DeliveryPartnerSafetyModal from "../DeliveryPartnerSafetyModal/DeliveryPartnerSafetyModal";

export default function DeliveryPartnerSafety() {
  const [showDeliveryPartnerSafetyModal, setShowDeliveryPartnerSafetyModal] =
    useState(false);
  return (
    <>
      <div className={classes["delivery-partner-container"]}>
        <img
          src={deliveryPartner}
          alt="Delivery Partner"
          className={classes["delivery-partner"]}
        />
        <h4>
          <span>See how we ensure our delivery partner’s safety</span>
          <span
            className={classes["learn-more"]}
            onClick={() => setShowDeliveryPartnerSafetyModal(true)}
          >
            {" "}
            Learn more
          </span>
        </h4>
      </div>
      {showDeliveryPartnerSafetyModal && (
        <DeliveryPartnerSafetyModal
          onClose={() => setShowDeliveryPartnerSafetyModal(false)}
        />
      )}
    </>
  );
}
