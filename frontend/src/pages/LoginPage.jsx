import React, { useState } from 'react';
import { Link } from "react-router";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAuth(); // login method destructure kia value m se jo return hui h
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    try {
      const data = await loginUser(formData); // backend returns token on running login controller
      await login(data.accessToken);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-base-content/60 mb-6">
            Login to manage your contacts
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="form-control">
              <span className="label-text mb-1">Email</span>
              <div className="input input-bordered flex items-center gap-2">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="grow"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="form-control">
              <span className="label-text mb-1">Password</span>
              <div className="input input-bordered flex items-center gap-2">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="grow"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </label>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage