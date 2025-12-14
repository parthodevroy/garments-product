// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router'; // <-- ensure react-router-dom

// const HomeProducts = () => {
//   const { data: products = [] } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await axios.get(`https://garments-management-server.vercel.app/products`);
//       return res.data;
//     },
//   });

//   // Filter only products with show_on_home === "permit"
//   const permittedProducts = products.filter(p => p.show_on_home === "permit");

//   return (
//     <div className="p-6 bg min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto lg:grid-cols-3 gap-6">
//         {permittedProducts.map((product) => (
//           <motion.div
//             key={product._id}
//             className="card rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow"
//             whileHover={{ scale: 1.03 }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* IMAGE */}
//             {product.product_image && (
//               <img
//                 src={product.product_image}
//                 alt={product.product_name}
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//             )}

//             {/* NAME */}
//             <h3 className="text-xl font-semibold mb-1">
//               {product.product_name}
//             </h3>

//             {/* CATEGORY */}
//             <p className="text-gray-600 mb-2">
//               {product.product_category}
//             </p>

//             {/* PRICE */}
//             <p className="text-gray-800 font-bold mb-2">
//               ${product.price_usd}
//             </p>

//             {/* AVAILABLE QUANTITY */}
//             <p className="text-gray-500 text-sm mb-4">
//               Available: {product.available_quantity}
//             </p>

//             {/* DETAILS BUTTON */}
//             <Link
//               to={`/details/${product._id}`}
//               className="btn btn-primary mt-auto w-full text-center"
//             >
//               View Details
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomeProducts;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useDebounce from "../../hooks/useDebounce";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(
        `https://garments-management-server.vercel.app/products?search=${debouncedSearch}`
      );
      return res.data; // backend returns array directly
    },
    enabled: true,
  });

  return (
    <div className="min-h-screen bg p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>

      {/* SEARCH INPUT */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* LOADING */}
      {isLoading && <p className="text-center text-gray-500">Searching...</p>}

      {/* RESULTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.length === 0 && !isLoading ? (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        ) : (
          products.map((product) => (
            <motion.div
              key={product._id}
              className="card rounded-xl shadow-md p-4 flex flex-col"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.product_image}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{product.product_name}</h3>
              <p className="text-gray-600">{product.product_category}</p>
              <p className="font-bold mt-2">${product.price_usd}</p>
              <Link
                to={`/details/${product._id}`}
                className="btn btn-primary mt-auto w-full"
              >
                View Details
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
