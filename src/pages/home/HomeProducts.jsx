import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";

const HomeProducts = () => {
    // Fetch only 6 products from backend
    const { data: products = [], isLoading } = useQuery({
        queryKey: ["home-products"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/products?limit=6");
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="text-center py-10">
                <p className="text-xl font-semibold">Loading Products...</p>
            </div>
        );
    }

    // Framer Motion variants for staggered fade-in
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const imageHover = {
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    };

    return (
        <div className="py-2  max-w-7xl bg-hero">
            <h2 className="text-3xl font-bold text-center mb-4">
                Featured Products
            </h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-2 p-6 space-x-6 "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        className="card w-[170px] h-auto rounded-lg shadow-lg p-2 bg-white"
                        variants={cardVariants}
                    >
                        {/* Image with hover effect */}
                        <motion.img
                            src={product.product_image}
                            alt={product.product_name}
                            className="w-full h-20 object-cover rounded-md"
                            variants={imageHover}
                            whileHover="hover"
                        />

                        <h3 className="text-xl font-semibold mt-3">{product.product_name}</h3>
                        <p className="text-gray-600 text-xs mt-1">
                            {product.product_description?.length > 20
                                ? product.product_description.slice(0, 20) + "..."
                                : product.product_description
                            }
                        </p>

                        <p className="text-lg font-bold mt-2 text-green-600">
                            ${product.price_usd}
                        </p>
                        <Link
                            to={`/details/${product._id}`}
                            className="btn btn-primary mt-auto w-full text-center"
                        >
                            View Details
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default HomeProducts;
