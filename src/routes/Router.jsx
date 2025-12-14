import { createBrowserRouter } from "react-router";
import Root from "../mainlayout/Root";
import Homepage from "../pages/home/Homepage";
import MainLayOut from "../mainlayout/MainLayOut";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PrivateRoutes from "./PrivateRoutes";

// import MyDashboard from "../pages/dashboard/Mydashboard/MyDashboard";
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
import CompletedOrder from "../pages/dashboard/managerOrder/CompletedOrder/CompletedOrder";
import Setting from "../pages/dashboard/Setting/Setting";
import ManagerDashboard from "../pages/dashboard/ManagerDashboard/ManagerDashboard";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import AllOrder from "../pages/dashboard/AdminDashboard/AllOrder";
import PendingOrder from "../pages/dashboard/ManagerDashboard/PendingOrder/PendingOrder";
import ManagerProfile from "../pages/dashboard/managerOrder/ManagerProfile/ManagerProfile";
import ApprovedOrder from "../pages/dashboard/ManagerDashboard/ApprovedOrder/ApprovedOrder";
import TrackOrder from "../pages/dashboard/BuyerOrderProducts/TrackOrder/TrackOrder";
import BuyerOrderDetails from "../pages/BuyerOrder/BuyerOrderDetails";
import ManagerPrivateRoutes from "./ManagerPrivateRoutes/ManagerPrivateRoutes";
import AdminPrivateRoute from "./AdminPrivateRoute";
import OrderDetails from "../pages/dashboard/AdminDashboard/OrderDetails";
import { Services } from "../pages/Service/Service";
import { Support } from "../pages/Support/Support";


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
        path: "about-us",
        Component:AboutUs
      },
      {
        path: "contact-us",
        Component:ContactUs
      },
      {
        path: "service",
        Component:Services
      },
      {
        path: "support",
        Component:Support
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
         element:<PrivateRoutes> <DetailsProducts /></PrivateRoutes>
         },
       { path: '/productcreated',
         element:<ManagerPrivateRoutes> <ProductCreated/></ManagerPrivateRoutes>
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
      
     
       <PrivateRoutes> <DashBoard></DashBoard></PrivateRoutes>
     
    ),
    children: [
      {
        index:true,
        element:<PrivateRoutes><DashboardHome></DashboardHome></PrivateRoutes>

      },
      {
        path: "setting",
      element:<PrivateRoutes><Setting></Setting></PrivateRoutes>
      },
     
      {
        path: "manager-dashboard-home",
        element:<ManagerPrivateRoutes><ManagerDashboard></ManagerDashboard></ManagerPrivateRoutes>
      },
      {
        path: "manager-created-product",
       element:<ManagerPrivateRoutes><ManagerCreatedProduct></ManagerCreatedProduct></ManagerPrivateRoutes>
      },
      {
        path: "Buyer-orders",
       element:<PrivateRoutes><BuyerOrder/></PrivateRoutes>
      },
      {
        path: "Buyer-order-details/:id",
       element:<PrivateRoutes><BuyerOrderDetails></BuyerOrderDetails></PrivateRoutes>
      },
      {
        path: "Buyer-order-track/:id",
       element:<PrivateRoutes><TrackOrderForm></TrackOrderForm></PrivateRoutes>
      },
      {
        path: "track-order/:orderId",
        element:<PrivateRoutes><TrackOrder></TrackOrder></PrivateRoutes>
      },
      {
        path: "Buyer-orders/:orderId",
        element:<PrivateRoutes><BuyerOrderDetails></BuyerOrderDetails></PrivateRoutes>
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
       element:<PrivateRoutes><PaymentHistory/></PrivateRoutes>
      },
     
      // rider related routes only rider can see this page
       {
        path:"manage-order",
        element:<ManagerOrder/>

      },
       {
        path:"completed-order",
        element:<ManagerPrivateRoutes><CompletedOrder/></ManagerPrivateRoutes>

      },
       {
        path:"pending-order",
        element:<ManagerPrivateRoutes><PendingOrder></PendingOrder></ManagerPrivateRoutes>

      },
       {
        path:"approved-order",
        element:<ManagerPrivateRoutes><ApprovedOrder></ApprovedOrder></ManagerPrivateRoutes>

      },
       {
        path:"manager-profile",
        element:<ManagerPrivateRoutes><ManagerProfile></ManagerProfile></ManagerPrivateRoutes>

      },
       {
        path:"all-products-Admin",
        element:<AdminPrivateRoute><AllproductAdmin/></AdminPrivateRoute>

      },
       {
        path:"all-orders",
        element:<AdminPrivateRoute><AllOrder/></AdminPrivateRoute>

      },
      {
         path:"orders/:orderId" ,
         element:<AdminPrivateRoute><OrderDetails></OrderDetails></AdminPrivateRoute>
      
      },
      
      {
        path:"user-management",
       element:
        <AdminPrivateRoute><UserManagement></UserManagement></AdminPrivateRoute>
       
    
      }
    ]
  }
]);
