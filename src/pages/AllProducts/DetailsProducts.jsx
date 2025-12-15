import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams, Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { motion } from 'framer-motion';

const DetailsProducts = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();

    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
    });
    console.log(product);


    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error loading product</p>;
    if (!product) return <p className="text-center mt-10">Product not found</p>;

    return (
        <motion.div
            className="max-w-3xl bg mx-auto p-6 card rounded-lg shadow-lg mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Product Image */}
            <img
                src={product.product_image}
                alt={product.product_name}
                className="w-full h-96 object-cover rounded-lg mb-6"
            />

            {/* Product Info */}
            <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
            <p className="text mb-4">{product.product_description}</p>

             <p className="text mb-2">Category: {product.product_category}</p>
            <p className="text-xl font-semibold mb-2">Price: ${product.price_usd}</p>
            
           
            <p className="text mb-4">Available Quantity: {product.available_quantity}</p>
            <p className="text mb-4">Minimum Order: {product.minimum_order}</p>
            <p className="text mb-4">Element: {product.fabric_composition}</p>
            <p className="text mb-4">Payment System: {product.payment_method}</p>

            {/* Back Button */}
            <Link
                to="/booking"
                state={{ product }} // pass product object
                className="inline-block text-center mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Book Now
            </Link>
        </motion.div>
    );
};

export default DetailsProducts;
