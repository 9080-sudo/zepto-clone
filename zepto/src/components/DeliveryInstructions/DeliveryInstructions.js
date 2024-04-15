import React from "react";

import bewareOfPets from "../../assets/DeliveryInstructions/beware_of_pets.avif";
import doNotRingTheBill from "../../assets/DeliveryInstructions/do_not_ring_bell.avif";
import noContactDelivery from "../../assets/DeliveryInstructions/no_contact_delivery.avif";
import returnPetBottles from "../../assets/DeliveryInstructions/return_bottle.avif";
import cocacolalogo from "../../assets/DeliveryInstructions/coca_cola_logo.avif";

import classes from "./DeliveryInstructions.module.css";
import { useFirebase } from "../../context/Firebase";

const deliveryInstructions = [
  {
    id: 1,
    name: "Beware Of Pets",
    description:
      "Delivery partner will be informed about the presennce of pet(s)",
    image: bewareOfPets,
  },
  {
    id: 2,
    name: "Do Not Ring the Bell",
    description: "Delivery partner will not ring the bell",
    image: doNotRingTheBill,
  },
  {
    id: 3,
    name: "No Contact Delivery",
    description: "Delivery partner will leave your order at your door",
    image: noContactDelivery,
  },
  {
    id: 4,
    name: "Return PET Bottles",
    description:
      "Help us recycle platic bottles by returning them to our delivery partner",
    image: returnPetBottles,
    initiateImage: cocacolalogo,
    initiatedBy: "CocaCola",
  },
];

export default function DeliveryInstructions() {
  const {
    deliveryInstructions: deliveryInstructions2,
    changeDeliveryInstructions,
  } = useFirebase();

  const checkExists = (id) => {
    return deliveryInstructions2.find(
      (deliveryInstruction) => deliveryInstruction.id === id
    );
  };

  return (
    <div className={classes["delivery-instructions-container"]}>
      <h5>Delivery Instructions</h5>
      <p className={classes["notify-description"]}>
        Delivery partner will be notfied
      </p>
      <ul className={classes["list-of-instructions"]}>
        {deliveryInstructions.map((instruction) => (
          <li
            key={instruction.id}
            className={`${classes["instruction"]} ${
              checkExists(instruction.id) ? classes["selected-instruction"] : ""
            }`}
            onClick={() => changeDeliveryInstructions(instruction)}
          >
            <img
              src={instruction.image}
              alt={instruction.name}
              className={classes["descr-icon"]}
            />
            <div>
              <h5>{instruction.name}</h5>
              <p className={classes["instruction-descr"]}>
                {instruction.description}
              </p>
              {instruction.initiateImage && (
                <p className={classes["initiate-description"]}>
                  <span>An initiative by</span>{" "}
                  <img
                    src={instruction.initiateImage}
                    alt={instruction.initiatedBy}
                    className={classes["initiate-image"]}
                  />
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
