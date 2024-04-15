import React from "react";

import openApp from "../../assets/HowItWorks/open-app.svg";
import placeOrder from "../../assets/HowItWorks/place-order.svg";
import freeDelivery from "../../assets/HowItWorks/free-delivery.svg";

import classes from './HowItWorks.module.css'

export default function HowItWorks() {
  return (
    <div className={classes['how-it-works-container']}>
      <h3>How it Works</h3>
      <div className={classes['image-description-container']}>
        <img src={openApp} alt="open app" className={classes['image']}/>
        <div className={classes['description-container']}>
          <h4>Open the app</h4>
          <p className={classes['description']}>
            Choose from over 7000 products across groceries, fresh fruits &
            veggies, meat, pet care, beauty items & more
          </p>
        </div>
      </div>
      <div className={classes['image-description-container']}>
        <img src={placeOrder} alt="place order" className={classes['image']}/>
        <div className={classes['description-container']}>
          <h4>Place an order</h4>
          <p className={classes['description']}>Add your favourite items to the cart & avail the best offers</p>
        </div>
      </div>
      <div className={classes['image-description-container']}>
        <img src={freeDelivery} alt="Free Delivery" className={classes['image']}/>
        <div className={classes['description-container']}>
          <h4>Get free delivery</h4>
          <p className={classes['description']}>Experience lighting-fast speed & get all your items delivered in 10 minutes</p>
        </div>
      </div>
    </div>
  );
}
