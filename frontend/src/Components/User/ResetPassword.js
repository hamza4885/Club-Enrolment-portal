import React,{useState}from "react";
import { message } from "antd"; // Import Ant Design message

import { useNavigate, useParams } from "react-router-dom";

import { useResetPasswordMutation } from "../../Redux/services/api/authapi";
import Loader from "../Loader/loader";
import { LockFilled } from "@ant-design/icons";

const ResetPassword = () => {
 
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from URL params

 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

   const [resetPassword, {isSuccess,isLoading,isError,error}]=useResetPasswordMutation()


  const resetPasswordSubmit = async(e) => {
    e.preventDefault();

    await resetPassword({password:password,confirmPassword:confirmPassword}); // Use the token from useParams
    message.success("Password Updated Successfully"); // Ant Design message for success
    navigate("/login");
  };


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-red-100 via-gray-50 to-red-200 fixed top-0 left-0">
            <div className="bg-white w-full max-w-sm p-8 rounded-xl shadow-lg">
              <h2 className="text-center text-gray-800 text-2xl font-bold mb-6 border-b pb-2 border-gray-300">
                Update Password
              </h2>

              <form
                className="flex flex-col items-center space-y-6"
                onSubmit={resetPasswordSubmit}
              >
                {/* New Password */}
                <div className="relative w-full flex items-center">
                  <LockFilled className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300 focus:border-red-400 transition"
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative w-full flex items-center">
                  <LockFilled className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300 focus:border-red-400 transition"
                  />
                </div>

                {/* Submit Button */}
                <input
                  type="submit"
                  value="Update Password"
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
