import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ManagerCreatedProduct = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Fetch manager products
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/products/by-manager/${user.email}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edit update
  const handleEditSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/products/${editingProduct._id}`, editingProduct)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire("Updated!", "Product updated successfully.", "success");

          setProducts((prev) =>
            prev.map((p) =>
              p._id === editingProduct._id ? { ...p, ...editingProduct } : p
            )
          );
          setEditingProduct(null);
        }
      })
      .catch((err) => console.error(err));
  };

  // Delete product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/products/${id}`).then(() => {
          Swal.fire("Deleted!", "Product removed!", "success");
          setProducts((prev) => prev.filter((p) => p._id !== id));
        });
      }
    });
  };

  // Filter results
  const filtered = products.filter((p) =>
    p.product_name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return <p className="p-10 text-xl">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        className="input input-bordered text dash w-full max-w-md mb-4"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full">
          <thead className="dash-card border-2 border-e-gray-800">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price USD</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((product) => (
              <tr key={product._id} className="dash-card text border-b-2">
                <td>
                  <img
                    src={product.product_image}
                    className="w-16 h-16 rounded object-cover"
                    alt=""
                  />
                </td>
                <td className="font-bold">{product.product_name}</td>
                <td>{product.product_category}</td>
                <td className="text-green-600 font-semibold">
                  ${product.price_usd}
                </td>
                <td>{product.available_quantity}</td>

                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
     {/* EDIT MODAL */}
{editingProduct && (
  <div
    className="fixed inset-0  bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    onClick={() => setEditingProduct(null)} // Click outside closes modal
  >
    <div
      className="bg-white/10 dash-card p-6 rounded-xl w-full max-w-lg shadow-2xl border border-white/20 relative"
      onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
    >
      {/* Close Icon */}
      <button
        className="absolute top-2 right-3 text-xl text-gray-300 hover:text-white"
        onClick={() => setEditingProduct(null)}
      >
        ✖
      </button>

      <h3 className="text-2xl font-bold mb-4">Edit Product</h3>

      <form onSubmit={handleEditSubmit} className="flex flex-col pt-4 gap-4">

        {/* Name */}
        <input
          type="text"
          name="product_name"
          value={editingProduct.product_name}
          onChange={handleEditChange}
          className="input input-bordered dash-card text w-full"
          placeholder="Product Name"
        />

        {/* CATEGORY */}
        <input
          type="text"
          name="product_category"
          value={editingProduct.product_category}
          onChange={handleEditChange}
          className="input input-bordered dash-card text w-full"
          placeholder="Category"
        />

        {/* DESCRIPTION */}
        <textarea
          name="product_description"
          value={editingProduct.product_description}
          onChange={handleEditChange}
          className="textarea textarea-bordered dash-card text w-full h-24"
          placeholder="Product Description"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price_usd"
          value={editingProduct.price_usd}
          onChange={handleEditChange}
          className="input input-bordered dash-card text w-full"
          placeholder="Price (USD)"
        />

        {/* QTY */}
        <input
          type="number"
          name="available_quantity"
          value={editingProduct.available_quantity}
          onChange={handleEditChange}
          className="input input-bordered dash-card text w-full"
          placeholder="Available Quantity"
        />

        {/* Payment Method */}
        <select
          name="payment_method"
          value={editingProduct.payment_method}
          onChange={handleEditChange}
          className="select select-bordered dash-card text w-full"
        >
          <option value="COD" className="bg-gray-700 text-white">Cash On Delivery</option>
          <option value="Bank" className="bg-gray-700 text-white">PayFast</option>
        </select>

        {/* Show On Home */}
        <select
          name="show_on_home"
          value={editingProduct.show_on_home}
          onChange={handleEditChange}
          className="select select-bordered dash-card text w-full"
        >
          <option value="permit" className="bg-gray-700 text-white font-bold">Show</option>
          <option value="hide" className="bg-gray-700 text-white font-bold">Hide</option>
        </select>

        {/* Image URL */}
        <input
          type="text"
          name="product_image"
          value={editingProduct.product_image}
          onChange={handleEditChange}
          placeholder="Product Image URL"
          className="input input-bordered dash-card text w-full"
        />

        {/* Buttons */}
        <div className="flex gap-3 pb-15 mt-2">
          <button className="btn btn-primary  w-55">Update</button>

          <button
            type="button"
            className="btn btn-outline w-55"
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

export default ManagerCreatedProduct;
