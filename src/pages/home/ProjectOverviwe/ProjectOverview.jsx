import React from "react";
import { motion } from "framer-motion";
import { FaBoxOpen, FaTruck, FaUser } from "react-icons/fa";

import { Link } from "react-router";


const ProjectOverview = () => {
  return (
    <div className="space-y-8">

      
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-16 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-b-3xl">
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

     
      {/* <section className="px-6 lg:px-24 space-y-10">
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 shadow-lg rounded-xl text-center hover:scale-105 transition">
            <img src="https://media.istockphoto.com/id/2206647632/photo/3d-upload-arrow-icon-on-cardboard-box-with-blue-background.jpg?s=1024x1024&w=is&k=20&c=dVLp6WFRQPMotwUUx0JOK4tAeE0qbQIyEKjotHMwHrY=" alt="" className="mx-auto w-24" />
            <h3 className="font-semibold mt-4">Send Parcel</h3>
            <p className="mt-2 text-gray-600">Easily send parcels to any location quickly.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl text-center hover:scale-105 transition">
            <img src="https://images.unsplash.com/photo-1625217527288-93919c99650a?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="mx-auto w-24" />
            <h3 className="font-semibold mt-4">Track Delivery</h3>
            <p className="mt-2 text-gray-600">Real-time tracking of your parcels from pickup to delivery.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl text-center hover:scale-105 transition">
            <img src="https://images.unsplash.com/photo-1616915939238-2a7a363d45c4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="mx-auto w-24" />
            <h3 className="font-semibold mt-4">Fast & Secure</h3>
            <p className="mt-2 text-gray-600">Safe and quick delivery with trusted riders and partners.</p>
          </div>
        </div>
      </section> */}

 
      {/* <section className="px-6 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-10">Our Featured Deliveries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="shadow-lg rounded-xl card overflow-hidden"
          >
            <img src="https://images.unsplash.com/photo-1625552187571-7ee60ac43d2b?q=80&w=2119&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-48 object-cover" />
            <div className="p-4 font-semibold">Parcel A</div>
          </motion.div>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="shadow-lg rounded-xl card overflow-hidden"
          >
            <img src="https://plus.unsplash.com/premium_photo-1764695512276-ad5efd06029a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-48 object-cover" />
            <div className="p-4 font-semibold">Parcel B</div>
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="shadow-lg rounded-xl card overflow-hidden"
          >
            <img src="https://plus.unsplash.com/premium_photo-1682000841285-8f37ce3b7dde?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-48 object-cover" />
            <div className="p-4 font-semibold">Parcel C</div>
          </motion.div>
        </div>
      </section> */}

      {/* <section className=" px-6 lg:px-24 py-2 rounded-xl space-y-10">
        <h2 className="text-3xl font-bold text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center card p-6 shadow-lg rounded-xl hover:scale-105 transition">
            <FaTruck className="mx-auto text-teal-500 text-4xl mb-4" />
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">Parcels delivered on time, every time.</p>
          </div>
          <div className="text-center card p-6 shadow-lg rounded-xl hover:scale-105 transition">
            <FaBoxOpen className="mx-auto text-teal-500 text-4xl mb-4" />
            <h3 className="font-semibold">Secure Handling</h3>
            <p className="text-gray-600 mt-2">Safe parcel handling with trusted riders.</p>
          </div>
          <div className="text-center card p-6 shadow-lg rounded-xl hover:scale-105 transition">
            <FaUser className="mx-auto text-teal-500 text-4xl mb-4" />
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-gray-600 mt-2">We are available to help you 24/7.</p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ProjectOverview;
