import React from "react";
import { Button } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Checkout = ({ products, token }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  const handlePayment = async () => {
    const headerConfig = token
      ? {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      : {};
    try {
      const stripe = await stripePromise;
      const session = await axios.post(
        "http://localhost:1337/api/orders",
        {
          orders: products,
        },
        headerConfig
      );
      await stripe.redirectToCheckout({
        sessionId: session.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button color="info" onClick={handlePayment}>
      Checkout
    </Button>
  );
};

export default Checkout;
