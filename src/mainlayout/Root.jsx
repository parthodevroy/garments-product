import React from "react";
import { Outlet } from "react-router";
import Navber from "../component/Navber";
import Footer from "../component/Footer";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navber />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Root;
