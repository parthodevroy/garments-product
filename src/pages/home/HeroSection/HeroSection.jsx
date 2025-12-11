import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";


const HeroSection = () => {
  return (
    <section className="bg-white py-8 mt-[64px]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-4">

        <div className="lg:w-1/2 w-full flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1674273913201-cfb203267df5?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fast Delivery"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Fast & Premium Quality
          </h1>
          <p className="text-gray-700 text-lg">
            Order Your Products ...
          </p>
          <div className="flex gap-4">
            <Link to={"/products"}>
              <motion.button
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-10 py-4 bg-black text-white rounded-md text-lg font-semibold tracking-widest shadow-lg"
              >
                EXPLORE NOW
              </motion.button>
            </Link>


          </div>
        </div>
      </div>
    </section>

  );
};

export default HeroSection;
