import { createBrowserRouter } from "react-router";
import Root from "../mainlayout/Root";
import Homepage from "../pages/home/Homepage";
import MainLayOut from "../mainlayout/MainLayOut";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PrivateRoutes from "./PrivateRoutes";

// import MyDashboard from "../pages/dashboard/Mydashboard/MyDashboard";
import Payment from "../pages/dashboard/Payment/Payment";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";

import DashBoard from "../mainlayout/DashBoard";
import DashboardHome from "../pages/dashboard/DashboardHome/DashboardHome";

import ProductTraking from "../pages/porductTraking/productTraking";
import AllProducts from "../pages/AllProducts/AllProducts";
import DetailsProducts from "../pages/AllProducts/DetailsProducts";
import ManagerCreatedProduct from "../pages/ManagerCreatedProduct/ManagerCreatedProduct";
import Bookings from "../pages/Bookings/Booking";
import ProductCreated from "../pages/ProductCreated/ProductCreated";
import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import ManagerOrder from "../pages/dashboard/managerOrder/ManagerOrder";
import BuyerOrder from "../pages/BuyerOrder/BuyerOrder";
import BuyerOrderDetailsTimeline from "../pages/BuyerOrderDetailsTimeline/BuyerOrderDetailsTimeline";
import TrackOrderForm from "../pages/BuyerOrderDetailsTimeline/TrackOrderForm";
import UserManagement from "../pages/dashboard/UserManagement/UserManagement";
import AllproductAdmin from "../pages/dashboard/AdminDashboard/AllproductAdmin";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      
      
      
      {
        path: "/booking",
        Component:Bookings
      },
      
      {
        path:'/traking-log/:trackingId',
        Component:ProductTraking
      },
      {
        path:'/products',
        Component:AllProducts
      },
       { path: '/details/:id',
         element: <DetailsProducts />
         },
       { path: '/productcreated',
         element: <ProductCreated/>
         },
      
    ]
  },

  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoard></DashBoard>
      </PrivateRoutes>
    ),
    children: [
      {
        index:true,
        element:<DashboardHome></DashboardHome>

      },
      {
        path: "manager-created-product",
        Component:ManagerCreatedProduct
      },
      {
        path: "Buyer-orders",
        Component:BuyerOrder
      },
      {
        path: "buyer-order-details/:id",
        Component:BuyerOrderDetailsTimeline
      },
      {
        path: "buyer-order-track/:id",
        Component:TrackOrderForm
      },
      {
        path: "payment/:orderId",
        Component: Payment
      },
      {
        path: "payment-success",
        Component: PaymentSuccess
      },
      {
        path: "payment-cancel",
        Component:PaymentCancel
      },
      {
        path: "payment-history",
        Component: PaymentHistory
      },
     
      // rider related routes only rider can see this page
       {
        path:"manage-order",
        element:<ManagerOrder/>

      },
       {
        path:"all-products-admin",
        element:<AllproductAdmin/>

      },
      // {
      //   path:"assign-delivery",
      //   element:<AssignDelivery></AssignDelivery>

      // },

      // admin related page only admin can access
      // {
      //   path:"rider-approval",
      //   element:<AdminPrivateRoute>
      //     <Approval></Approval>
      //     </AdminPrivateRoute>
      // },
      // {
      //   path:"assign-rider",
      //   element:<AdminPrivateRoute>
      //     <AssignRider></AssignRider>
      //     </AdminPrivateRoute>
      // },
      {
        path:"user-management",
       element:
        <UserManagement></UserManagement>
       
    
      }
    ]
  }
]);
