import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/apiHelper";
import "../styles/LoginForm.css";



const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email } = values;
    try {
      const response = await apiPost("auth/login", values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("email", email);
        setTimeout(() => {
          navigate("/dashboard", { state: { email } });
        }, 3000);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intern-login-container flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form
          name="login-form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Username"
            name="user_name"
            rules={[{ required: true, message: "Please input fields." }]}
          >
            <Input placeholder="Enter your username" disabled={loading} className="h-10" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input fields." }]}
          >
            <Input.Password placeholder="Enter your password" disabled={loading} className="h-10" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} className="h-10">
              Login
            </Button>
          </Form.Item>

          <div className="register-here text-center">
            <Button type="link" onClick={() => navigate("/create-account")}>
              Register here
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
