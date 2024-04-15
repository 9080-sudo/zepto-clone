import React from "react";

import classes from './HowItWorksCard.module.css'

export default function HowItWorksCard({ image, title, description }) {
  return (
    <div className={classes['how-it-works-card']}>
      <img src={image} alt={title} />
      <h3 className={classes['title']}>{title}</h3>
      <p className={classes['description']}>{description}</p>
    </div>
  );
}
