import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Logo from "./Logo";

const Navbar = () => {
  const { user, signout } = useAuth();
  const { role } = useRole();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    signout().catch((err) => console.log(err));
    setShowMenu(false);
    setShowDropdown(false);
  };

  const linkItems = (
    <>
      {/* Public Links */}
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
              : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
          }
        >
          Home
        </NavLink>
      </li>
      <li
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
        className="relative"
      >
        <span className="cursor-pointer text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all">
          Projects
        </span>
        {showDropdown && (
          <ul className="absolute top-full left-0 bg-white shadow-lg rounded mt-2 w-48">
            <li className="px-4 py-2 hover:bg-teal-100">
              <NavLink to="/project-page">Project Page</NavLink>
            </li>
            <li className="px-4 py-2 hover:bg-teal-100">
              <NavLink to="/project-details">Project Details</NavLink>
            </li>
          </ul>
        )}
      </li>
      <li>
        <NavLink
          to="/service"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
              : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
          }
        >
          Service
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
              : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
              : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
          }
        >
          Support
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
              : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
          }
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
              : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
          }
        >
          About
        </NavLink>
      </li>

      {/* User Links */}
      {user && (
        <>
          <li>
            <NavLink
              to="/parcel"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
                  : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
              }
            >
              Send Parcel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
                  : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
              }
            >
              Dashboard
            </NavLink>
          </li>
          {role === "rider" && (
            <li>
              <NavLink
                to="/dashboard/assign-delivery"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
                    : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
                }
              >
                Assign Delivery
              </NavLink>
            </li>
          )}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/user-management"
                  className={({ isActive }) =>
                    isActive
                      ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
                      : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
                  }
                >
                  User Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/assign-rider"
                  className={({ isActive }) =>
                    isActive
                      ? "text-teal-600 font-extrabold border-b-2 border-teal-600 px-2 py-1 transition-all"
                      : "text-gray-700 font-extrabold hover:text-teal-600 px-2 py-1 transition-all"
                  }
                >
                  Assign Rider
                </NavLink>
              </li>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white w-full px-4 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <NavLink to="/" className="text-2xl font-bold text-teal-600">
       <Logo/>
      </NavLink>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-4 items-center">{linkItems}</ul>

      {/* Auth/User Menu */}
      <div className="relative">
        {user ? (
          <div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden"
            >
              <FaUserCircle className="w-full h-full text-gray-600" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-44">
                <ul>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-teal-100"
                    >
                      <FaSignOutAlt className="inline mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
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
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-teal-100"
                >
                  <FaSignOutAlt className="inline mr-2" /> Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
