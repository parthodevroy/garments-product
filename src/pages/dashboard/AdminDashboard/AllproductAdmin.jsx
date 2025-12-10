import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AllproductAdmin = () => {
    const queryClient = useQueryClient();

    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/products`);
            return res.data;
        },
    });
    console.log(products);


    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        product_name: "",
        product_category: "",
        product_description: "",
        price_usd: "",
        available_quantity: "",
        minimum_order: "",
        demo_video: "",
        show_on_home: "no",
    });

    // Open modal with selected product
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
            show_on_home: product.show_on_home || "no",

            payment_method: product.payment_method
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? "permit" : "no") : value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:3000/products/${editingProduct._id}`,
                formData
            );
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            setEditingProduct(null);
            queryClient.invalidateQueries(["products"]);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update product", "error");
        }
    };

    const handleDelete = async (product) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `Delete ${product.product_name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/products/${product._id}`);
                Swal.fire("Deleted!", "Product has been deleted.", "success");
                queryClient.invalidateQueries(["products"]);
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete product", "error");
            }
        }
    };

    // Toggle table checkbox
    const toggleShowOnHome = async (product) => {
        const newValue = product.show_on_home === "permit" ? "no" : "permit";
        try {
            await axios.patch(
                `http://localhost:3000/products/${product._id}/show-on-home`,
                { value: newValue }
            );

            queryClient.setQueryData(["products"], (old) =>
                old.map((p) =>
                    p._id === product._id ? { ...p, show_on_home: newValue } : p
                )
            );

            Swal.fire({
                icon: "success",
                title: `Show on home: ${newValue}`,
                timer: 1000,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update show on home status", "error");
        }
    };
    console.log(products);


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Price USD</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Created By</th>
                            <th className="px-4 py-2">Show on Home</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, idx) => (
                            <tr
                                key={product._id}
                                className={`border-b ${product.show_on_home === "permit" ? "bg-green-50" : ""}`}
                            >
                                <td className="px-4 py-2">{idx + 1}</td>

                                {/* Image */}
                                <td className="px-4 py-2">
                                    {product.product_image ? (
                                        <img
                                            src={product.product_image}
                                            alt={product.product_name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>

                                <td className="px-4 py-2">{product.product_name}</td>
                                <td className="px-4 py-2">${product.price_usd}</td>
                                <td className="px-4 py-2">{product.product_category}</td>

                                {/* Created By */}
                                <td className="px-4 py-2">{product.createdBy}</td>

                                <td className="px-12 py-2">
                                    <input
                                        type="checkbox"
                                        checked={product.show_on_home === "permit"}
                                        onChange={() => toggleShowOnHome(product)}
                                    />
                                </td>

                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => openUpdateForm(product)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(product)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
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
                                type="text"
                                name="demo_video"
                                placeholder="Demo Video URL"
                                value={formData.demo_video}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />

                            {/* IMAGE UPLOAD */}
                            <input
                                type="text"
                                name="product_image"
                                placeholder="Product Image URL"
                                value={formData.product_image || ""}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />

                            {/* PAYMENT OPTIONS */}
                            {/* PAYMENT METHOD */}
                            <label className="flex flex-col mt-2">
                                <span className="mb-1 font-medium">Payment Method</span>
                                <select
                                    name="payment_method"
                                    value={formData.payment_method || "COD"}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    required
                                >
                                    <option value="COD">COD</option>
                                    <option value="bKash">PayFast</option>

                                </select>
                            </label>


                            <label className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    name="show_on_home"
                                    checked={formData.show_on_home === "permit"}
                                    onChange={handleChange}
                                />
                                Show on Home Page
                            </label>

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
