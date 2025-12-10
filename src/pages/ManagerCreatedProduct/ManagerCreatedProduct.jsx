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
        className="input input-bordered w-full max-w-md mb-4"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-gray-200">
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
              <tr key={product._id} className="hover:bg-gray-50">
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
     {editingProduct && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4"
    onClick={() => setEditingProduct(null)} // Close when clicking outside
  >
    <div
      className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      {/* Close Icon */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        onClick={() => setEditingProduct(null)}
      >
        ✖
      </button>

      <h3 className="text-2xl font-bold mb-4">Edit Product</h3>

      <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
        {/* Name */}
        <input
          type="text"
          name="product_name"
          value={editingProduct.product_name}
          onChange={handleEditChange}
          className="input input-bordered"
        />

        {/* CATEGORY */}
        <input
          type="text"
          name="product_category"
          value={editingProduct.product_category}
          onChange={handleEditChange}
          className="input input-bordered"
        />

        {/* DESCRIPTION */}
        <textarea
          name="product_description"
          value={editingProduct.product_description}
          onChange={handleEditChange}
          className="input input-bordered h-24"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price_usd"
          value={editingProduct.price_usd}
          onChange={handleEditChange}
          className="input input-bordered"
        />

        {/* QTY */}
        <input
          type="number"
          name="available_quantity"
          value={editingProduct.available_quantity}
          onChange={handleEditChange}
          className="input input-bordered"
        />

        {/* Payment Method */}
        <select
          name="payment_method"
          className="select select-bordered"
          value={editingProduct.payment_method}
          onChange={handleEditChange}
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Bank">PayFast</option>
        </select>

        {/* Show on Home */}
        <select
          name="show_on_home"
          className="select select-bordered"
          value={editingProduct.show_on_home}
          onChange={handleEditChange}
        >
          <option value="permit">Show</option>
          <option value="hide">Hide</option>
        </select>

        {/* Image URL */}
        <input
          type="text"
          name="product_image"
          value={editingProduct.product_image}
          onChange={handleEditChange}
          placeholder="Product Image URL"
          className="input input-bordered"
        />

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <button className="btn btn-primary w-full">Update</button>

          <button
            type="button"
            className="btn btn-gray w-full"
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
