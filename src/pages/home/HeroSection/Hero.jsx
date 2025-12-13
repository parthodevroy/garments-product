
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section
      className="
        relative w-full min-h-screen 
        // bg-hero
        flex flex-col items-center justify-center text-center px-6 overflow-hidden
      "
    >
      {/* Background Glow Effects */}
     <div className="absolute bottom-0 right-0 w-72 h-72 opacity-20 blur-[120px]"
       style={{ background: "var(--glow-pink)" }}></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-navbar opacity-20 blur-[120px]"></div>

      {/* Top Amazing Text */}
      <motion.p
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-16 top-32 rotate-12 text-3xl font-handwriting text"
      >
        Amazing
      </motion.p>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold text leading-snug"
      >
        Elegant — Fast — Customizable
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        className="mt-4 text-lg text-gray-600 max-w-2xl"
      >
        A visually impressive and vibrant Garments Production & Order Tracking System.
      </motion.p>


      {/* Explore Button */}
      <Link to={"/products"}>
      <motion.button
        whileHover={{ scale: 1.09 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-10 py-4 bg-black text-white rounded-md text-lg font-semibold tracking-widest shadow-lg"
      >
        BOOK PRODUCTS
      </motion.button>

      </Link>
      {/* Floating Images Left */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2024/07/31/23/04/workflow-8935726_1280.png"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6 }}
        className="absolute left-10 bottom-10 w-72 rounded-xl shadow-xl"
      />

      {/* Floating Images Right */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2019/04/01/17/31/process-4095965_1280.jpg"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6 }}
        className="absolute right-10 bottom-10 w-72 rounded-xl shadow-xl"
      />

      {/* Main Center Showcase */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2020/07/24/20/52/hands-5435053_1280.jpg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="mt-20  w-72 rounded-xl shadow-xl"
      />
    </section>
  );
};

export default Hero;
