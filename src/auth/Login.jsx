import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import SocialLogin from "./social/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { userlogin,setLoading } = useAuth();
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const handellogin = async (data) => {
  setAuthError("");

  try {
    await userlogin(data.email, data.password);

   
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back to GOPTS ",
      timer: 1500,
      showConfirmButton: false,
    });

    
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 1500);

  } catch (error) {
    console.error(error);

    if (error.code === "auth/invalid-credential") {
      setAuthError("Invalid email or password");
    } else if (error.code === "auth/user-not-found") {
      setAuthError("No account found with this email");
    } else if (error.code === "auth/wrong-password") {
      setAuthError("Incorrect password");
    } else {
      setAuthError("Login failed. Please try again");
    }
  }
  setLoading(false)
};


  return (
    <div className="w-full max-w-sm mx-auto card p-6 rounded-xl shadow-xl bg-white/80 backdrop-blur">
      {/* Header */}
      <h3 className="text-3xl font-bold text-center text-gray-800">
        Welcome Back
      </h3>
      <p className="text-center text-gray-600 mb-4">
        Please login to continue
      </p>

      {/* Firebase Error */}
      {authError && (
        <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3 text-center">
          {authError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(handellogin)} className="space-y-3">
        {/* Email */}
        <div className="form-control">
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: true })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              Email is required
            </p>
          )}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label font-semibold">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            })}
            placeholder="Enter your password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">
              Password is required
            </p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-sm mt-1">
              Password must include uppercase, lowercase & number
            </p>
          )}
        </div>

        {/* Login Button */}
        <button className="btn btn-neutral w-full mt-2">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-2 text-sm">
          Create an Account at ZapShift
          <Link
            className="text-blue-600 font-semibold underline pl-1"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>

      {/* Social Login */}
      <div className="mt-4">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
