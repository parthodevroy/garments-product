import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllproductAdmin = () => {
    const queryClient = useQueryClient();
    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/products`);
            return res.data;
        },
    });

    // Update form state
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        product_name: "",
        product_category: "",
        product_description: "",
        price_usd: "",
        available_quantity: "",
        minimum_order: "",
        demo_video: "",
    });

    // Open update form
    const openUpdateForm = (product) => {
        setEditingProduct(product);
        setFormData({
            product_name: product.product_name || "",
            product_category: product.product_category || "",
            product_description: product.product_description || "",
            price_usd: product.price_usd || "",
            available_quantity: product.available_quantity || "",
            minimum_order: product.minimum_order || "",
            demo_video: product.demo_video || "",
        });
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit updated product
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/products/${editingProduct._id}`, formData);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `your status has been ${status}`,
                showConfirmButton: false,
                timer: 2000
            });
            setEditingProduct(null);
            queryClient.invalidateQueries(["products"]); // Refresh product list
        } catch (err) {
            console.error(err);
            alert("Failed to update product");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {product.product_image && (
                            <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-full h-28 object-cover rounded-lg mb-4"
                            />
                        )}

                        <h3 className="text-xl font-semibold mb-1">
                            {product.product_name}
                        </h3>
                        <p className="text-gray-600 mb-2">{product.product_category}</p>
                        <p className="text-gray-800 font-bold mb-2">${product.price_usd}</p>
                        {product.product_description && (
                            <p className="text-gray-500 text-sm mb-4">
                                Available: {product.available_quantity}
                            </p>
                        )}

                        <Link
                            to={`/details/${product._id}`}
                            className="btn btn-primary w-full text-center mb-2"
                        >
                            View Details
                        </Link>

                        <button
                            className="btn btn-warning w-full text-center"
                            onClick={() => openUpdateForm(product)}
                        >
                            Update
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Update Form Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Update Product</h3>
                        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                            <input
                                type="text"
                                name="product_name"
                                placeholder="Product Name"
                                value={formData.product_name}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="text"
                                name="product_category"
                                placeholder="Category"
                                value={formData.product_category}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                            <textarea
                                name="product_description"
                                placeholder="Description"
                                value={formData.product_description}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                rows={3}
                            />
                            <input
                                type="number"
                                name="price_usd"
                                placeholder="Price USD"
                                value={formData.price_usd}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                type="number"
                                name="available_quantity"
                                placeholder="Available Quantity"
                                value={formData.available_quantity}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="number"
                                name="minimum_order"
                                placeholder="Minimum Order"
                                value={formData.minimum_order}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="demo_video"
                                placeholder="Demo Video URL"
                                value={formData.demo_video}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />

                            <div className="flex justify-between mt-4">
                                <button type="submit" className="btn btn-success w-1/2 mr-2">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-error w-1/2"
                                    onClick={() => setEditingProduct(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllproductAdmin;
