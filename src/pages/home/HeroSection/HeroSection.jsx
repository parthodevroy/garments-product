import React from "react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="bg-white py-8 mt-[64px]">
  <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-4">

    <div className="lg:w-1/2 w-full flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1493135637657-c2411b3497ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Fast Delivery"
        className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="lg:w-1/2 w-full flex flex-col gap-6">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
        Fast & Reliable Parcel Delivery
      </h1>
      <p className="text-gray-700 text-lg">
        Send your parcels anywhere...
      </p>
      <div className="flex gap-4">
        <Link to={"/parcel"}>
          <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600">
            Send Parcel
          </button>
        </Link>

        <Link to={"/dashboard/my-parcels"}>
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300">
            Track Parcel
          </button>
        </Link>
      </div>
    </div>
  </div>
</section>

  );
};

export default HeroSection;
