import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section
      className="
        relative w-full h-full lg:min-h-screen
        flex flex-col items-center justify-center
        text-center bg-navbar
        px-4 sm:px-6 overflow-hidden
      "
    >
      {/* Ambient Glow */}
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 opacity-20 blur-[140px]"
        style={{ background: "var(--glow-pink)" }}
      />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-navbar opacity-20 blur-[140px]" />

      {/* Floating Accent Text */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          absolute right-6 sm:right-16 top-20 sm:top-28
          rotate-12 text-xl sm:text-3xl
          font-handwriting text-gray-400
          select-none
        "
      >
        Amazing
      </motion.p>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          text-3xl sm:text-5xl md:text-6xl
          font-extrabold tracking-tight
          leading-tight
        "
      >
        Elegant • Fast • Customizable
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="
          mt-5 text-sm sm:text-lg
          text-gray-500
          max-w-xl sm:max-w-2xl
        "
      >
        A modern Garments Production & Order Tracking System designed
        for efficiency, transparency, and scalable business growth.
      </motion.p>

      {/* CTA */}
      <Link to="/products">
        <motion.button
          whileHover={{ scale: 1.09 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-10 py-4 bg-black text-white rounded-md text-lg font-semibold tracking-widest shadow-lg"
        >
          BOOK PRODUCTS
        </motion.button>
      </Link>

      {/* Left Image */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2024/07/31/23/04/workflow-8935726_1280.png"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="
          hidden md:block
          absolute left-8 bottom-14
          w-56 lg:w-72
          rounded-xl shadow-2xl
        "
      />

      {/* Right Image */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2019/04/01/17/31/process-4095965_1280.jpg"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="
          hidden md:block
          absolute right-8 bottom-14
          w-56 lg:w-72
          rounded-xl shadow-2xl
        "
      />

      {/* Center Image */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2020/07/24/20/52/hands-5435053_1280.jpg"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="
          mt-16 sm:mt-20
          w-52 sm:w-64 md:w-72
          rounded-2xl shadow-2xl
        "
      />
    </section>
  );
};

export default Hero;
