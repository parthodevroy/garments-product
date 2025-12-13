import React from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaUsers, FaClipboardList, FaTruck, FaBox } from "react-icons/fa";

// Sample orders
const ordersSample = [
  { id: 1, productName: "Red Dress", status: "Pending", image: "https://i.ibb.co/7dNB7DRn/clothes1.jpg" },
  { id: 2, productName: "Blue Shirt", status: "Delivered", image: "https://i.ibb.co/7dNB7DRn/clothes2.jpg" },
  { id: 3, productName: "Jeans", status: "Processing", image: "https://i.ibb.co/7dNB7DRn/clothes3.jpg" },
  { id: 4, productName: "Jacket", status: "Delivered", image: "https://i.ibb.co/7dNB7DRn/clothes4.jpg" },
];

// Sample stats
const statsSample = {
  totalOrders: 40,
  delivered: 25,
  pending: 10,
  processing: 5,
};

const ProjectSummaryUi = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-4">Garments Order & Tracking</h1>
        <p className="text-lg mb-6">Track your orders and manage your workflow efficiently</p>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-10">
          <motion.div
            className="bg-white text-blue-700 rounded-xl shadow-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaBox className="w-10 h-10 mb-2" />
            <p className="text-sm font-semibold">Total Orders</p>
            <p className="text-2xl font-bold">{statsSample.totalOrders}</p>
          </motion.div>
          <motion.div
            className="bg-white text-green-600 rounded-xl shadow-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaTruck className="w-10 h-10 mb-2" />
            <p className="text-sm font-semibold">Delivered</p>
            <p className="text-2xl font-bold">{statsSample.delivered}</p>
          </motion.div>
          <motion.div
            className="bg-white text-yellow-500 rounded-xl shadow-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaBox className="w-10 h-10 mb-2" />
            <p className="text-sm font-semibold">Pending</p>
            <p className="text-2xl font-bold">{statsSample.pending}</p>
          </motion.div>
          <motion.div
            className="bg-white text-orange-500 rounded-xl shadow-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaClipboardList className="w-10 h-10 mb-2" />
            <p className="text-sm font-semibold">Processing</p>
            <p className="text-2xl font-bold">{statsSample.processing}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Workflow Section */}
      <motion.div
        className="mt-16 px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Roles & Workflow</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              role: "Buyer",
              desc: "Place orders and track parcels in real-time.",
              icon: <FaUserAlt className="w-12 h-12 text-blue-500" />,
            },
            {
              role: "Manager",
              desc: "Approve orders and update statuses efficiently.",
              icon: <FaClipboardList className="w-12 h-12 text-green-500" />,
            },
            {
              role: "Admin",
              desc: "Oversee all operations and manage users/products.",
              icon: <FaUsers className="w-12 h-12 text-purple-500" />,
            },
          ].map((item) => (
            <motion.div
              key={item.role}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {item.icon}
              <h3 className="text-xl font-bold mt-4">{item.role}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders Carousel */}
      <motion.div className="mt-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Recent Orders</h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {ordersSample.map((order) => (
            <motion.div
              key={order.id}
              className="bg-white shadow-lg rounded-xl w-64 flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={order.image}
                alt={order.productName}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{order.productName}</h3>
                <p
                  className={`mt-1 font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : "text-orange-500"
                  }`}
                >
                  {order.status}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-orange-500"
                    }`}
                    style={{
                      width:
                        order.status === "Delivered"
                          ? "100%"
                          : order.status === "Pending"
                          ? "60%"
                          : "30%",
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <footer className="text-center py-10 text-gray-500">
        © 2025 Garments Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default ProjectSummaryUi;
