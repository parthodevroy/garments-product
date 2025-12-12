import React from "react";
import Logo from "../component/Logo";
import { Link, Outlet } from "react-router";

const MainLayOut = () => {
  return (
    <div className="min-h-screen card flex justify-center">
      <div className="w-full max-w-6xl px-4 py-6">

        {/* Logo */}
        <Link to="/" className="block mb-6 pl-6">
          <Logo />
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 card shadow-lg rounded-2xl overflow-hidden">

          {/* LEFT SIDE CONTENT */}
          <div className="p-6 md:p-10 flex items-center justify-center min-h-[600px]">
            <div className="w-full">
              <Outlet />
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="h-[400px] dash-card md:h-auto">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/13/16/55/hacker-5485843_1280.png"
              alt="Auth Banner"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainLayOut;
