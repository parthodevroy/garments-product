// import React, { useEffect } from "react";
// import { useForm, useWatch } from "react-hook-form";
// import { useNavigate, useLocation } from "react-router";
// import Swal from "sweetalert2";
// import useAxios from "../../hooks/useAxios";
// import useAuth from "../../hooks/useAuth";
// import { toast } from "react-toastify";
// import useUserStatus from "../../hooks/useUserStatus";

// const Bookings = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxios();
//   const navigate = useNavigate();
//   const { isSuspended,dbUser } = useUserStatus();


//   const { state } = useLocation();
//   const product = state?.product;  

//   const { register, handleSubmit, control, setValue } = useForm();

//   // auto calculate price
//   const quantity = useWatch({ control, name: "quantity" });
// console.log(dbUser);

//   useEffect(() => {
//     if (quantity) {
//       const total = quantity * product.price_usd;
//       setValue("orderPrice", total);
//     }
//   }, [quantity, product, setValue]);

//   const validateOrder = (data) => {
//     if (data.quantity < product.minimum_order ||
//         data.quantity > product.available_quantity) {

//       Swal.fire(
//         "Error",
//         `Quantity must be between ${product.minimum_order} and ${product.available_quantity}`,
//         "error"
//       );
//       return false;
//     }
//     return true;
//   };



//   const onSubmit = (data) => {
//    if (isSuspended) {
//     Swal.fire({
//       icon: "error",
//       title: "Suspended",
//       text: "You cannot place an order while suspended.cheek your profile for suspended reason"
//     });
//     return;
//   }
//   if (dbUser.status==="pending") {
//      Swal.fire({
//       icon: "error",
//       title: "Pending",
//       text: "You cannot place an order while pending.please waiting for admin approval"
//     });
//     return;

//   }
//     if (!validateOrder(data)) return;


//     Swal.fire({
//       title: "Confirm Order?",
//       text: "Are you sure you want to place this order?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Confirm",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const orderData = {
//           ...data,
//           productId: product._id,
//           productName: product.product_name,
//           unitPrice: product.price_usd,
//           totalPrice: data.orderPrice,
//           customerEmail: user?.email,
//           manageremail:product.createdBy,
//           payment_method:product.payment_method

//         };

//         axiosSecure.post("/order", orderData).then((res) => {
//           if (res.data.insertedId) {
//             toast.success("Order placed successfully!");
//             navigate("/dashboard/buyer-orders");
//           }
//         });
//       }
//     });
//   };
// console.log(product);

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">
//         Booking: {product.product_name}
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

//         {/* User email */}
//         <input
//           type="email"
//           readOnly
//           value={user?.email}
//           className="input bg-gray-100"
//           {...register("email")}
//         />

//         {/* Product name */}
//         <input
//           type="text"
//           readOnly
//           value={product.product_name}
//           className="input bg-gray-100"
//           {...register("productName")}
//         />

//         {/* Unit price */}
//         <input
//           type="number"
//           readOnly
//           value={product.price_usd}
//           className="input bg-gray-100"
//           {...register("unitPrice")}
//         />

//         {/* Quantity */}
//         <input
//           type="number"
//           placeholder={`Min ${product.minimum_order}, Max ${product.available_quantity}`}
//           className="input"
//           {...register("quantity", { required: true })}
//         />

//         {/* Auto calculated price */}
//         <input
//           type="number"
//           readOnly
//           className="input bg-gray-100"
//           {...register("orderPrice")}
//         />

//         {/* Additional Info */}
//         <input type="text" placeholder="First Name" className="input" {...register("firstName", { required: true })} />
//         <input type="text" placeholder="Last Name" className="input" {...register("lastName", { required: true })} />
//         <input type="tel" placeholder="Contact Number" className="input" {...register("contactNumber", { required: true })} />
//         <textarea placeholder="Delivery Address" className="input h-24" {...register("deliveryAddress", { required: true })} />

//         <button type="submit" className="btn btn-primary mt-4">
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Bookings;
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useUserStatus from "../../hooks/useUserStatus";

const Bookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { isSuspended, dbUser } = useUserStatus();
  const { state } = useLocation();
  const product = state?.product;

  const { register, handleSubmit, control, setValue } = useForm();

  // Auto calculate total price
  const quantity = useWatch({ control, name: "quantity" });
  useEffect(() => {
    if (quantity) {
      const total = quantity * product.price_usd;
      setValue("orderPrice", total);
    }
  }, [quantity, product, setValue]);

  // Validate order quantity
  const validateOrder = (data) => {
    if (
      data.quantity < product.minimum_order ||
      data.quantity > product.available_quantity
    ) {
      Swal.fire(
        "Error",
        `Quantity must be between ${product.minimum_order} and ${product.available_quantity}`,
        "error"
      );
      return false;
    }
    return true;
  };

  // Create Order in DB (returns orderId)
  const createOrder = async (data) => {
    const orderData = {
      productId: product._id,
      productName: product.product_name,
      unitPrice: product.price_usd,
      totalPrice: data.orderPrice,
      quantity: data.quantity,
      customerEmail: user?.email,
      managerEmail: product.createdBy,
      payment_method: product.payment_method,
      paymentStatus: product.payment_method === "Cash on Delivery" ? "paid" : "pending",
      trackingId: Math.random().toString(36).substring(2, 10),
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      deliveryAddress: data.deliveryAddress,
      additionalNotes:data.additionalNotes
    };

    const res = await axiosSecure.post("/order", orderData);
    return res.data.insertedId;
  };

  // Handle COD Booking
  const handleCODBooking = async (data) => {
    try {
      const productId = await createOrder(data);
      if (productId) {
        toast.success("Order placed successfully!");
        navigate("/dashboard/buyer-orders");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to place order. Try again.", "error");
    }
  };

  // Handle Stripe Payment
  const handleStripePayment = async (data) => {
    try {
      const productId = await createOrder(data); 
      const paymentInfo = {
        totalPrice: data.orderPrice,
        productName: product.product_name,

        productId:productId,
        buyerEmail: user?.email,
        quantity: data.quantity,
      };
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

      
      window.open(res.data.url, "_self");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed. Try again.", "error");
    }
  };



  // Main submit
  const onSubmit = (data) => {
    if (isSuspended) {
      Swal.fire({
        icon: "error",
        title: "Suspended",
        text: "You cannot place an order while suspended. Check your profile for reason.",
      });
      return;
    }

    if (dbUser.status === "pending") {
      Swal.fire({
        icon: "error",
        title: "Pending",
        text: "You cannot place an order while pending. Please wait for admin approval.",
      });
      return;
    }

    if (!validateOrder(data)) return;

    if (product.payment_method === "COD") {
      Swal.fire({
        title: "Confirm COD Order?",
        text: `Are you sure you want to place this COD order?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Confirm",
      }).then((result) => {
        if (result.isConfirmed) handleCODBooking(data);
      });
    } else {
      Swal.fire({
        title: "Proceed to Payment?",
        text: `You need to pay $${data.orderPrice} to book ${data.productName}.`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Pay Now",
      }).then((result) => {
        if (result.isConfirmed) handleStripePayment(data);
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Booking: {product.product_name}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input type="email" readOnly value={user?.email} className="input bg-gray-100" {...register("email")} />
        <input type="text" readOnly value={product.product_name} className="input bg-gray-100" {...register("productName")} />
        <input type="number" readOnly value={product.price_usd} className="input bg-gray-100" {...register("unitPrice")} />
        <input type="number" placeholder={`Min ${product.minimum_order}, Max ${product.available_quantity}`} className="input" {...register("quantity", { required: true })} />
        <input type="number" readOnly className="input bg-gray-100" {...register("orderPrice")} />
        <input type="text" placeholder="First Name" className="input" {...register("firstName", { required: true })} />
        <input type="text" placeholder="Last Name" className="input" {...register("lastName", { required: true })} />
        <input type="tel" placeholder="Contact Number" className="input" {...register("contactNumber", { required: true })} />
        <textarea placeholder="Delivery Address" className="input h-24" {...register("deliveryAddress", { required: true })} />
        <textarea placeholder="Additional Notes" className="input h-16" {...register("additionalNotes", { required: true })} />

        <button type="submit" className="btn btn-primary mt-4">
          {product.payment_method === "COD" ? "Place Order (COD)" : `Pay & Book ($${product.price_usd})`}
        </button> 
        
      </form>
    </div>
  );
};

export default Bookings;
