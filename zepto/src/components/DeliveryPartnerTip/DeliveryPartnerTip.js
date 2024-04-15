import React from "react";

import tenImage from "../../assets/DeliveryPartnerTip/10Image.avif";
import twentyImage from "../../assets/DeliveryPartnerTip/20Image.avif";
import doubleImage from "../../assets/DeliveryPartnerTip/3550Image.avif";

import classes from './DeliveryPartnerTip.module.css'
import { useFirebase } from "../../context/Firebase";
const tips = [
  { amount: 10, image: tenImage },
  { amount: 20, image: twentyImage },
  { amount: 35, image: doubleImage },
  { amount: 50, image: doubleImage },
];

export default function DeliveryPartnerTip() {
const {deliveryTip, setDeliveryTip} = useFirebase()
  return (
    <div className={classes['delivery-partner-tip-container']}>
      <h4>Delivery Partner Tip</h4>
      <p className={classes['sending-amount']}>The entire amount will be sent to your delivery partner</p>
      <ul className={classes['list-of-tips']}>
        {tips.map((tip) => (
          <li key={tip.amount} className={`${classes['tip']} ${tip.amount === deliveryTip ? classes['selected-tip']: ''}`} onClick={() => setDeliveryTip(t => t === tip.amount ? 0: tip.amount)}>
            <img src={tip.image} alt={`Tip ${tip.amount}`} />
            <span>&#x20b9;{tip.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
