import React from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaTruck, FaUser } from "react-icons/fa";

import { Link } from "react-router";


const ProjectOverview = () => {
  return (
    <div className="space-y-8">

      
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-16 discount to-blue-500 text-white rounded-b-3xl">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold">
           Our Special Offer Going On This Week

          </h1>
          <p className="text-lg lg:text-xl">
            Booking your products anywhere in Bangladesh with speed,and tracking.
          </p>
        <Link to={"/products"}>
             <motion.button
               whileHover={{ scale: 1.09 }}
               whileTap={{ scale: 0.95 }}
               className="mt-8 px-10 py-4 bg-black text-white rounded-md text-lg font-semibold tracking-widest shadow-lg"
             >
               BOOK PRODUCTS
             </motion.button>
             </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img src="https://plus.unsplash.com/premium_photo-1670509045675-af9f249b1bbe?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Delivery Hero" className="w-80 lg:w-full" />
        </div>
      </section>

     
    </div>
  );
};

export default ProjectOverview;
