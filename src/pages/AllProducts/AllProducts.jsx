import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; // <- import Link

const AllProducts = () => {
    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/products`);
            return res.data;
        },
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* IMAGE */}
                        {product.product_image && (
                            <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                        )}

                        {/* NAME */}
                        <h3 className="text-xl font-semibold mb-1">
                            {product.product_name}
                        </h3>

                        {/* CATEGORY */}
                        <p className="text-gray-600 mb-2">
                            {product.product_category}
                        </p>

                        {/* PRICE */}
                        <p className="text-gray-800 font-bold mb-2">
                            ${product.price_usd}
                        </p>

                        {/* DESCRIPTION */}
                        {product.product_description && (
                            <p className="text-gray-500 space-x-2 text-sm mb-4">
                                Available product: {product.available_quantity}...
                            </p>
                        )}

                        {/* DETAILS BUTTON */}
                        <Link
                            to={`/details/${product._id}`}
                            className="btn btn-primary mt-auto w-full text-center"
                        >
                            View Details
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
