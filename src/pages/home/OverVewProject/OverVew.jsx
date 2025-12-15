import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Demo data — তুমি API দিয়ে replace করতে পারবে
const hotSelling = [
  { id: 1, name: "Muslim Abaya", image: "https://plus.unsplash.com/premium_photo-1681489830925-d47810835fda?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Traditional Clothing" },
  { id: 2, name: "Premium Abaya", image: "https://images.unsplash.com/photo-1753177173000-390a8b8649d9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Clothing" },
];

const newArrivals = [
  { id: 1, name: "Executive Chair", image: "https://plus.unsplash.com/premium_photo-1681487199798-5359121979f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Raw Materials", image: "https://plus.unsplash.com/premium_photo-1661957097683-f949f745e3f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Machine Motor", image: "https://plus.unsplash.com/premium_photo-1723690833182-f709238c9061?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Machine Motor", image: "https://plus.unsplash.com/premium_photo-1723690833182-f709238c9061?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, name: "Premium Camera", image: "https://images.unsplash.com/photo-1506447529978-88238903af49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 6, name: "Card Pay", image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const topDeals = [
  { id: 1, name: "Camera Tripod", image: "https://plus.unsplash.com/premium_photo-1663039904834-2c103e67af86?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Microcontroller Board", image: "https://images.unsplash.com/photo-1610878785620-3ab2d3a2ae7b?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const OverVew = () => {
  return (
    <div className="bg-card h-full lg:min-h-screen py-10">
      
     
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card shadow-md rounded-xl p-4"
        >
          <h2 className="text-xl font-bold mb-4">🔥 Hot Selling</h2>

          {hotSelling.map((item) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={item.id}
              className="bg-card p-3 mb-3 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg h-40 w-full object-cover"
              />
              <p className="mt-2 font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.category}</p>
            </motion.div>
          ))}
        </motion.div>

     
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-card shadow-md rounded-xl p-4"
        >
          <h2 className="text-xl font-bold mb-4">🆕 New Arrivals</h2>

          <div className="grid grid-cols-2 gap-4">
            {newArrivals.map((item) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={item.id}
                className="bg-card p-3 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg h-24 w-full object-cover"
                />
                <p className="mt-1 text-sm">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-card shadow-md rounded-xl p-4"
        >
          <h2 className="text-xl font-bold mb-4">🎯 Top Deals</h2>

          {topDeals.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={item.id}
              className="bg-card p-3 mb-3 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg h-42 w-full object-cover"
              />
              <p className="mt-2 font-semibold">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default OverVew;
