import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios
        .post("/api/stripe/confirm-payment", { sessionId })
        .then(() => alert("Subscription successful!"))
        .catch(() => alert("Error confirming payment."));
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <CheckCircleIcon className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-green-500">Payment Successful! 🎉</h1>
        <p className="text-gray-700 mt-2">Thank you for subscribing. Enjoy premium access!</p>

        {/* Navigate to Profile Button */}
        <button
          onClick={() => navigate("/clubs/userProfile")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
