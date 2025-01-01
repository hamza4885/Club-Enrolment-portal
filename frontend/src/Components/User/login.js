import React, { useState } from "react";
import { LockOutlined, UserOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import bgImage from "../Assets/Images/bg1.jpg";
import Loader from "../Loader/loader";
import { useLoginMutation } from "../../Redux/services/api/authapi";
import {useGetAllClubsQuery } from "../../Redux/services/api/clubapi";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const { data: clubsData, refetch } = useGetAllClubsQuery();

  const handleLogin = async () => {
    try {
      const response = await login({ email: loginEmail, password: loginPassword }).unwrap();
      message.success("Login successful!");
 
      const { success, token, user } = response;
  
      if (success) {
        localStorage.setItem("token", token); 
        localStorage.setItem("user", JSON.stringify(user));
        
        const expirationTime = Date.now() + 1 * 60 * 1000; // 15 minutes
        sessionStorage.setItem("userId", JSON.stringify({ userId: user._id, expirationTime }));

        setTimeout(() => {
          sessionStorage.removeItem("userId");
          console.log("User session expired. Removed from sessionStorage.");
        }, 15 * 60 * 1000);
      } else {
        message.error("Invalid credentials.");
        return;
      }
  
      // ✅ Role-based navigation
      if (user.role === "manager") {
  
        try {
          const { data } = await refetch();
          const matchedClub = data.find(club => club.managerEmail === user.email);
          if (matchedClub) {
            navigate(`/clubs/manager/${matchedClub._id}`);
            return;
          }
        } catch (error) {
          message.error("Failed to fetch clubs.");
        }
      } else if (user.role === "user") {
        console.log("User Profile");
        navigate(`/clubs/userProfile`);
        return;
      } else if (user.role === "admin") {
        navigate(`/clubs/adminPanel`);
        return;
      } else {
        navigate("/");
      }
    } catch (err) {
      message.error(err.data?.message || "Login failed.");
    }
};

  

  const onFinish = () => {
    handleLogin();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="flex items-center justify-center min-h-screen bg-cover bg-center"
        >
          <div className="bg-white bg-opacity-90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md mx-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Welcome Back
            </h1>
            
            <Button
              type="default"
              icon={<GoogleOutlined />}
              className="w-full h-12 flex items-center justify-center mb-6 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600"
            >
              Continue with Google
            </Button>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                className="mb-6"
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="john@example.com"
                  size="large"
                  className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className="mb-6"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="••••••••"
                  size="large"
                  className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item className="mb-6">
                <div className="flex justify-between items-center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-600">Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    to="/forgotpassword"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Form.Item>

              <Form.Item className="mb-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-none rounded-lg shadow-sm"
                >
                  Sign in
                </Button>
              </Form.Item>

              <div className="text-center text-gray-600">
                Not a member?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create account
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;