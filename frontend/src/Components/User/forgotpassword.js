import React, { useState } from "react";

import { message } from "antd";
import { useForgotpasswordMutation } from "../../Redux/services/api/authapi";
import Loader from "../Loader/loader";
import { MailOutlined } from "@ant-design/icons";

const ForgotPassword = () => {


// Use the RTK Query mutation hook
  const [forgotpassword, { isLoading, isSuccess, isError, error }] = useForgotpasswordMutation();

  const [useremail, setuseremail] = useState("");

  const forgotPasswordSubmit = async(e) => {
    e.preventDefault();

    await forgotpassword({email:useremail})
    message.success("useremail has successfully sent")
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-200 via-gray-100 to-purple-200 fixed top-0 left-0">
            <div className="bg-white w-full max-w-sm p-8 rounded-xl shadow-lg">
              <h2 className="text-center text-gray-700 text-2xl font-bold mb-6 border-b pb-2 border-gray-300">
                Forgot Password
              </h2>

              <form
                className="flex flex-col items-center space-y-6"
                onSubmit={forgotPasswordSubmit}
              >
                {/* useremail Input */}
                <div className="relative w-full flex items-center">
                  <MailOutlined className="absolute left-3 text-gray-400 text-lg" />
                  <input
                    type="useremail"
                    placeholder="Enter your useremail"
                    required
                    name="useremail"
                    value={useremail}
                    onChange={(e) => setuseremail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-400 transition"
                  />
                </div>

                {/* Submit Button */}
                <input
                  type="submit"
                  value="Send Reset Link"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
