import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ManagerCreatedProduct = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  // --- Fetch manager's products ---
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/products/by-manager/${user.email}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  // --- Update product ---
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/products/${editingProduct._id}`, editingProduct)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire("Updated!", "Product updated successfully.", "success");
          // Update local state
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

  // --- Delete product ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/products/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", "Product deleted successfully.", "success");
            setProducts((prev) => prev.filter((p) => p._id !== id));
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded">
            <img
              src={product.product_image}
              alt=""
              className="w-full h-40 object-cover rounded"
            />
           <div className="flex justify-between">
             <h3 className="text-lg font-bold mt-2">{product.product_name}</h3>
            {/* <h2 className="text-lg fond-bold mt-2  text-gray-600">{product.product_category}</h2> */}
            <p className="text-lg fond-bold mt-2 text-gray-600">${product.price_usd}</p>
           </div>

            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-sm btn-blue"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-red"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="product_name"
                value={editingProduct.product_name}
                onChange={handleEditChange}
                placeholder="Product Name"
                className="input input-bordered"
              />
              <input
                type="text"
                name="category"
                value={editingProduct.category}
                onChange={handleEditChange}
                placeholder="Category"
                className="input input-bordered"
              />
              <textarea
                name="product_description"
                value={editingProduct.product_description}
                onChange={handleEditChange}
                placeholder="Description"
                className="input input-bordered h-24"
              />
              <input
                type="number"
                name="price_usd"
                value={editingProduct.price_usd}
                onChange={handleEditChange}
                placeholder="Price USD"
                className="input input-bordered"
              />
              <input
                type="number"
                name="available_quantity"
                value={editingProduct.available_quantity}
                onChange={handleEditChange}
                placeholder="Available Quantity"
                className="input input-bordered"
              />
              <input
                type="number"
                name="minimum_order"
                value={editingProduct.minimum_order}
                onChange={handleEditChange}
                placeholder="Minimum Order"
                className="input input-bordered"
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-gray"
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
