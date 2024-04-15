import React from "react";

import classes from "./HowItWorksLargeView.module.css";

import openApp from "../../assets/HowItWorksLargeView/open-app.svg";
import placeOrder from "../../assets/HowItWorksLargeView/do-not-blink.svg";
import enjoy from "../../assets/HowItWorksLargeView/enjoy.svg";
import HowItWorksCard from "../HowItWorksCard/HowItWorksCard";

const howItWorks = [
  {
    id: 1,
    image: openApp,
    title: "Open the app",
    description:
      "Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more",
  },
  {
    id: 2,
    image: placeOrder,
    title: "Place an order",
    description: "Add your favourite items to the cart & avail the best offers",
  },
  {
    id: 3,
    image: enjoy,
    title: "Get free delivery",
    description:
      "Experience lighting-fast speed & get all your items delivered in 10 minutes",
  },
];

export default function HowItWorksLargeView() {
  return (
    <div>
      <h3 className={classes['heading']}>How it Works</h3>
      <div className={classes['how-it-works-container']}>
        {howItWorks.map((howDoesItWork) => {
          const { id, image, title, description } = howDoesItWork;
          return (
            <HowItWorksCard
              key={id}
              title={title}
              image={image}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
}
