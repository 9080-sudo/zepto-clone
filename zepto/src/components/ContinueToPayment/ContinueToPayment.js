import React, { useState } from "react";

import { useFirebase } from "../../context/Firebase";

import { FaLocationDot } from "react-icons/fa6";

import classes from "./ContinueToPayment.module.css";
import SelectAddressModal from "../SelectAddressModal/SelectAddressModal";
import { useNavigate } from "react-router-dom";
// import PlaceOrderModal from "../PlaceOrderModal/PlaceOrderModal";
import logo from '../../assets/Zepto/zepto.png'

export default function ContinueToPayment() {
  const { selectedAddress, placeOrder, amountToBePaid, userDetails } = useFirebase();
  const {name, email} = userDetails
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  // const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false)

  const amount = amountToBePaid * 100;
  console.log(amount);
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_VMRDNU93WFaNL7", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Zepto Company", //your business name
      description: "order transaction",
      image: logo,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
        await placeOrder();
        // alert("order placed");
        navigate("/");
      },prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: name, //your customer's name
        email: email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <>
      <div>
        <p>{selectedAddress}</p>
        <button className={classes["change-location-btn"]}>
          <FaLocationDot />
          <span
            className={classes["change-text"]}
            onClick={() => setShowModal(true)}
          >
            Change
          </span>
        </button>
        {/* <button className={classes["continue-to-payment-btn"]} onClick={() => setShowPlaceOrderModal(true)}>
          CONTINUE TO PAYMENT
        </button> */}
        <button
          className={classes["continue-to-payment-btn"]}
          onClick={paymentHandler}
        >
          CONTINUE TO PAYMENT
        </button>
      </div>
      {showModal && (
        <SelectAddressModal closeModal={() => setShowModal(false)} />
      )}
      {/* {showPlaceOrderModal && <PlaceOrderModal closeModal={() => setShowPlaceOrderModal(false)}/>} */}
    </>
  );
}
