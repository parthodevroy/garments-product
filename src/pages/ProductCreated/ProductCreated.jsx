import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useUserStatus from '../../hooks/useUserStatus';

const ProductCreated = () => {

  const { register, handleSubmit, reset } = useForm();
  const [previewImages, setPreviewImages] = useState([]);
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const {user}=useAuth()
  const {isSuspended,dbUser}=useUserStatus()

  // --- Image Preview Handler ---
  const handleImagePreview = (e) => {
    const files = e.target.files;
    const newPreview = [...files].map(file => URL.createObjectURL(file));
    setPreviewImages(newPreview);
  };

  // --- Submit Product Form ---
  const onSubmit = async (data) => {
    if (isSuspended) {
        Swal.fire({
          icon: "error",
          title: "Suspended",
          text: "You cannot created an product because you are suspended.cheek your profile for suspended reason"
        });
        return;
      }

      if (dbUser.status==="pending") {
           Swal.fire({
            icon: "error",
            title: "Pending",
            text: "You cannot Created an Product while pending.please waiting for Admin approval"
          });
          return;
          
        }
    try {

      // STEP 1: Upload all images to imgbb
      const imageFiles = data.images;
      const uploadedImageUrls = [];

      for (let file of imageFiles) {
        const formData = new FormData();
        formData.append("image", file);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_bb_key}`;

        const uploadRes = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        uploadedImageUrls.push(uploadRes.data.data.url); 
      }

      // STEP 2: Create product object
     const productData = {
  product_name: data.name,
  product_category: data.category,
  product_description: data.description,

  price_usd: parseFloat(data.price),
  available_quantity: parseInt(data.quantity),
  minimum_order: parseInt(data.moq),
  payment_method:data.paymentOption,

  product_image: uploadedImageUrls?.[0] || "",
  demo_video: data.demoVideo,
  show_on_home: data.showOnHome ? "yes" : "no",

  color_options: data.colorOptions || [],
  fabric_composition: data.fabricComposition || "",
  greetings_card_image: data.greetingsCardImage || "",

  createdBy: user?.email,     
  createdByName: user?.displayName,
  date_added: new Date()
};



      // STEP 3: Confirm add
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this Product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
      }).then((result) => {

        if (result.isConfirmed) {
          axiosSecure.post("/products", productData)
            .then(res => {
              if (res.data.insertedId) {
                toast.success("Product Added Successfully!");
                reset();
                navigate("/dashboard/manager-created-product");
              }
            });
        }
      });

    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg p-6 text rounded-md">

      <h2 className="text-2xl font-bold">Add New Product</h2>
      <p>Create your product and publish</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">

        <div className="mb-3">
          <label>Product Name</label>
          <input type="text" className="input w-full" {...register("name", { required: true })} />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea className="textarea w-full" {...register("description", { required: true })}></textarea>
        </div>

        <div className="mb-3">
          <label>Category</label>
          <select className="select w-full" {...register("category", { required: true })}>
            <option value="">Select Category</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Jacket">Jacket</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input type="number" className="input w-full" {...register("price", { required: true })} />
        </div>

        <div className="mb-3">
          <label>Available Quantity</label>
          <input type="number" className="input w-full" {...register("quantity", { required: true })} />
        </div>

        <div className="mb-3">
          <label>Minimum Order Quantity (MOQ)</label>
          <input type="number" className="input w-full" {...register("moq", { required: true })} />
        </div>

        <div className="mb-3">
          <label>Demo Video Link (Optional)</label>
          <input type="text" className="input w-full" {...register("demoVideo")} />
        </div>

        <div className="mb-3">
          <label>Payment Option</label>
          <select className="select w-full" {...register("paymentOption", { required: true })}>
            <option value="">Select Payment Method</option>
            <option value="COD">Cash on Delivery</option>
            <option value="PayFast">PayFast</option>
          </select>
        </div>


        <div className="mb-3">
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            className="file-input w-full"
            {...register("images", { required: true })}
            onChange={handleImagePreview}
          />
        </div>
        
       

        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {previewImages.map((img, i) => (
              <img key={i} src={img} className="w-full h-32 object-cover rounded" />
            ))}
          </div>
        )}
         <div className="flex items-center gap-3 mb-3">
          <input type="checkbox" {...register("showOnHome")} />
          <label>Show on Home Page</label>
        </div>

        <button className="btn btn-primary mt-4">Create Product</button>

      </form>
    </div>
  );
};

export default ProductCreated;
