
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Logo from "./Logo";
import useUserStatus from "../hooks/useUserStatus";

const Navbar = () => {
  const { user, signout } = useAuth();
  const { role } = useRole();

  const [showMenu, setShowMenu] = useState(false);
  const { dbUser } = useUserStatus()
  const [dark, setDark] = useState(false)

const [scrolled, setScrolled] =useState (false);




  const handleLogout = () => {
    signout().catch((err) => console.log(err));
    setShowMenu(false);
  };
  // console.log(dbUser, user);

  // handel them
  const handelthem = (checked) => {
    const theme = checked ? "dark" : "light";
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setDark(checked)
  };


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const dark = savedTheme === "dark";
    setDark(dark)
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {  // 50px scroll হলে change হবে
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text font-bold border-b-2 border-teal-600 px-2 py-1"
              : "text font-bold hover:text-teal-600 px-2 py-1"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text font-bold border-b-2 border-teal-600 px-2 py-1"
              : "text font-bold hover:text-teal-600 px-2 py-1"
          }
        >
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/service"
          className={({ isActive }) =>
            isActive
              ? "text font-bold border-b-2 border-teal-600 px-2 py-1"
              : "text font-bold hover:text-teal-600 px-2 py-1"
          }
        >
          Service
        </NavLink>
      </li>
      {/* 
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-bold border-b-2 border-teal-600 px-2 py-1"
              : "text-gray-700 font-bold hover:text-teal-600 px-2 py-1"
          }
        >
          Coverage
        </NavLink>
      </li> */}

      <li>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            isActive
              ? "text font-bold border-b-2 border-teal-600 px-2 py-1"
              : "text font-bold hover:text-teal-600 px-2 py-1"
          }
        >
          Support
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "text font-bold border-b-2 border-teal-600 px-2 py-1"
              : "text font-bold hover:text-teal-600 px-2 py-1"
          }
        >
          Contact
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "text font-bold border-b-2 border-teal-600 px-2 py-1"
              : "text font-bold hover:text-teal-600 px-2 py-1"
          }
        >
          About
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text font-bold border-b-2 border-teal-600 px-2 py-1"
                  : "text font-bold hover:text-teal-600 px-2 py-1"
              }
            >
              Dashboard
            </NavLink>
          </li>


{/* 
          {role === "Manager" && (
            <li>
              <NavLink
                to="/productcreated"
                className="text font-bold hover:text-teal-600 px-2 py-1"
              >
                Created Product
              </NavLink>
            </li>
          )} */}
        </>
      )}
    </>
  );


  return (
    <nav
      className={`w-full pl-4 lg:pl-10 pr-3 lg:pr-10 h-30 px-4 py-4 flex justify-between items-center 
        sticky top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-navbar2" : "bg-hero"
        }`}
    >
      <NavLink to="/" className=" font-bold text">
        <Logo />
      </NavLink>

      {/* Desktop */}
      <ul className="hidden lg:flex gap-4 items-center">{linkItems}</ul>

      {/* User Avatar */}
      <div className="relative">
        {user ? (
          <div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden"
            >
              {user.
                photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="w-full h-full text" />
              )}


            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-44 p-2">
                {dbUser?.status === "suspended" && (
                  <div className="bg-red-100 p-2 mb-2 rounded border border-red-400 text-sm">
                    Suspended: {dbUser.suspendReason}
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-teal-100"
                >
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
                <li className="pl-2">
                  <input onChange={(e) => handelthem(e.target.checked)} checked={dark} type="checkbox" className="toggle " />
                  <span className="pl-1 text-xs">Select Theme</span>
                </li>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <li className="">

              <input onChange={(e) => handelthem(e.target.checked)} checked={dark} type="checkbox" className="toggle " />
              {/* <span className="pl-1">Select Theme</span> */}
            </li>
            <NavLink to="/login" className="px-4 py-2 bg-teal-600 text rounded">
              Login
            </NavLink>
            <NavLink to="/register" className="px-4 py-2 bg-gray-200 text rounded">
              Register
            </NavLink>
           
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="lg:hidden relative">
        <button onClick={() => setShowMenu(!showMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {showMenu && (
          <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-52 flex flex-col gap-2 p-2">
            {linkItems}

            {dbUser?.status === "suspended" && (
              <div className="bg-red-100 p-2 rounded border border-red-400 text-sm">
                Suspended: {dbUser.suspendReason}
              </div>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-teal-100"
              >
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
