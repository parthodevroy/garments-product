import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ManagerCreatedProduct = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/products/by-manager/${user.email}`)
                .then(res => setProducts(res.data))
                .catch(err => console.error(err));
        }
    }, [user?.email]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Products</h2>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product._id} className="p-4 border rounded">
                            <img src={product.product_image} className="w-full h-40 object-cover rounded" />
                            <h3 className="text-lg font-bold mt-2">{product.product_name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagerCreatedProduct;
