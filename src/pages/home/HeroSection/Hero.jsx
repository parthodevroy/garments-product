// import React from 'react';
// import { motion } from 'framer-motion';
// import { Typewriter } from 'react-simple-typewriter';

// const Hero = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3, // Each child animates with a delay
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10
//       },
//     },
//   };

//   return (
//     <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         muted
//         loop
//         id="myVideo"
//         className="absolute z-0 w-full h-full object-cover"
//       >
//         <source src="https://cdn.pixabay.com/video/2018/10/25/18897-297379518_large.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Dark Overlay */}
//       <div className="absolute z-10 w-full h-full bg-black opacity-60"></div>

//       {/* Content with Framer Motion Animations */}
//       <motion.div
//         className="relative z-20 text-center max-w-4xl px-4"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h1
//           className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl"
//           variants={itemVariants}
//         >
//           PARTODAP ROY
//         </motion.h1>

//         <motion.p
//           className="mt-4 text-2xl font-medium sm:text-3xl text-green-400"
//           variants={itemVariants}
//         >
//           Full Stack Developer | Transforming Ideas into Web Experiences
//         </motion.p>

//         <motion.h2
//           className="mt-6 text-xl font-normal text-gray-200 h-10"
//           variants={itemVariants}
//         >
//           <Typewriter
//             cursor
//             delaySpeed={1000}
//             deleteSpeed={25}
//             loop={0}
//             typeSpeed={75}
//             words={[
//               'Building Scalable Frontends with React & Next.js.',
//               'Focused on High-Quality and Clean Code.',
//               'Seeking Collaborative Innovation.'
//             ]}
//           />
//         </motion.h2>

//         <motion.div
//           className="mt-10 flex justify-center space-x-4"
//           variants={itemVariants}
//         >
//           <a
//             href="/projects"
//             className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-400 hover:bg-green-500 transition duration-300 shadow-lg"
//           >
//             Explore Projects
//           </a>
//           <a
//             href="/resume.pdf"
//             className="px-8 py-3 border border-green-400 text-base font-medium rounded-full text-green-400 hover:bg-green-400 hover:text-black transition duration-300"
//           >
//             Download CV
//           </a>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;
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
        className="absolute right-16 top-32 rotate-12 text-3xl font-handwriting text-gray-700"
      >
        Amazing
      </motion.p>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold text-gray-900 leading-snug"
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
        EXPLORE NOW
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
