import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Each child animates with a delay
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src="https://cdn.pixabay.com/video/2018/10/25/18897-297379518_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute z-10 w-full h-full bg-black opacity-60"></div>

      {/* Content with Framer Motion Animations */}
      <motion.div
        className="relative z-20 text-center max-w-4xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl"
          variants={itemVariants}
        >
          PARTODAP ROY
        </motion.h1>

        <motion.p
          className="mt-4 text-2xl font-medium sm:text-3xl text-green-400"
          variants={itemVariants}
        >
          Full Stack Developer | Transforming Ideas into Web Experiences
        </motion.p>

        <motion.h2
          className="mt-6 text-xl font-normal text-gray-200 h-10"
          variants={itemVariants}
        >
          <Typewriter
            cursor
            delaySpeed={1000}
            deleteSpeed={25}
            loop={0}
            typeSpeed={75}
            words={[
              'Building Scalable Frontends with React & Next.js.',
              'Focused on High-Quality and Clean Code.',
              'Seeking Collaborative Innovation.'
            ]}
          />
        </motion.h2>

        <motion.div
          className="mt-10 flex justify-center space-x-4"
          variants={itemVariants}
        >
          <a
            href="/projects"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-green-400 hover:bg-green-500 transition duration-300 shadow-lg"
          >
            Explore Projects
          </a>
          <a
            href="/resume.pdf"
            className="px-8 py-3 border border-green-400 text-base font-medium rounded-full text-green-400 hover:bg-green-400 hover:text-black transition duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;