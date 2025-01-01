import React, { useState,useEffect} from 'react';
import { LockOutlined, UserOutlined, MailOutlined, UploadOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox, message, Upload, Divider, Typography, Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../Assets/Images/bg1.jpg';
import Loader from '../Loader/loader';
import { useRegisterMutation } from '../../Redux/services/api/authapi';
import axios from "axios"
const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  // Use the RTK Query mutation hook
  const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation();
 

  const handleSignUp = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (avatar) formData.append("avatar", avatar);
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
  
      if (response.data.user) {
        const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.data.user, expiry: expiryTime })
        );
        message.success("Registration successful");
        navigate("/login");
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      message.error(err?.response?.data?.message || "Registration failed");
    }
  };
  
  
  useEffect(() => {
    localStorage.removeItem("user");
}, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div 
      style={{ 
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} 
      className="min-h-screen flex items-center justify-center p-4"
    >
      {isLoading || isSubmitting ? (
        <Loader />
      ) : (
        <Card className="w-full max-w-md shadow-lg">
          <div className="text-center mb-6">
            <Title level={3} className="mb-1">Create Your Account</Title>
            <Text type="secondary">Join our community today</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSignUp}
            encType="multipart/form-data"
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: 'Please input your full name!' },
                { min: 3, message: 'Name must be at least 3 characters' }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />} 
                placeholder="email@example.com" 
                email="email"
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
              hasFeedback
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />} 
                placeholder="••••••" 
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />} 
                placeholder="••••••" 
                size="large"
              />
            </Form.Item>

            <Form.Item>
                    <div className="flex items-center justify-between">
                        <img src={avatarPreview} alt="Avatar Preview" className="w-18 h-14 rounded-full" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="ml-4"
                        />
                    </div>
                </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { 
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('You must accept the terms and conditions'),
                },
              ]}
            >
              <Checkbox>
                I have read and agree to the <a href="/terms">Terms and Conditions</a>
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="newsletter"
              valuePropName="checked"
            >
              <Checkbox>
                Subscribe to our newsletter for updates and tips
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                loading={isSubmitting}
                block
              >
                Create Account
              </Button>
            </Form.Item>

            <Divider>or</Divider>

            <div className="text-center mb-4">
              <Button 
                icon={<GoogleOutlined />} 
                size="large"
                block
              >
                Sign up with Google
              </Button>
            </div>

            <div className="text-center">
              <Text>Already have an account? <Link to="/login" className="text-primary">Log in</Link></Text>
            </div>
          </Form>
        </Card>
      )}
    </div>
      )}
    </>
  );
};

export default Signup;
