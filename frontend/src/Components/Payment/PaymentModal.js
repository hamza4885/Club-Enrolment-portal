import React, { useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import { Typography } from "antd";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Fixed typo

  // Retrieve selected package details
  const selectedPackage = location.state?.selectedPackage;
  const amount = selectedPackage?.amount || 0;

  if (!selectedPackage) {
    navigate("/");
    return null;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/payment/process",
        { amount: Math.round(amount * 100) },
        config
      );

      const client_secret = data.client_secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert(result.error.message); // ✅ Fixed alert.error
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          "http://localhost:4000/api/Members/premiumMembers",
          {
            userId: user._id,
            name: user.name,
            email: user.email,
            package: selectedPackage.name,
            amount: selectedPackage.amount, // ✅ Fixed placement
          },
          config
        );

        navigate("success");
      } else {
        alert("There's an issue while processing the payment.");
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white h-[70vh] my-4 p-4">
      <form
        className="w-full max-w-sm p-4 border rounded shadow-md flex flex-col space-y-4"
        onSubmit={submitHandler}
      >
        <Typography className="text-center text-lg font-medium mb-2 border-b border-gray-300 pb-2">
          Card Info
        </Typography>
        <div className="relative flex items-center">
          <CreditCard className="absolute text-gray-500 text-lg transform translate-x-3" />
          <CardNumberElement className="w-full px-4 py-2 border border-gray-400 rounded" />
        </div>
        <div className="relative flex items-center">
          <Event className="absolute text-gray-500 text-lg transform translate-x-3" />
          <CardExpiryElement className="w-full px-4 py-2 border border-gray-400 rounded" />
        </div>
        <div className="relative flex items-center">
          <VpnKey className="absolute text-gray-500 text-lg transform translate-x-3" />
          <CardCvcElement className="w-full px-4 py-2 border border-gray-400 rounded" />
        </div>

        <input
          type="submit"
          value={`Pay - $${amount}`}
          ref={payBtn}
          className="bg-red-500 text-white font-medium text-base w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-red-600"
        />
      </form>
    </div>
  );
};

export default Payment;
