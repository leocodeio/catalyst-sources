import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ searchTerm, setSearchTerm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get the current path
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isLoggedin = localStorage.getItem("isLoggedin");
  const email = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="bg-[#e7dfd8] shadow-md p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto mb-7">
          <h1 className="text-2xl font-bold text-[#2a2926] mb-2 md:mb-0">
            Blog Website
          </h1>
          <button
            onClick={toggleMenu}
            className="md:hidden bg-[#2a2926] text-white px-4 py-2 rounded-lg hover:bg-black transition"
          >
            &#9776; {/* Hamburger icon */}
          </button>
        </div>

        {/* Search Bar - Only on Home Page (Desktop) */}
        {location.pathname === "/" && (
          <div className="flex items-center mb-2 md:mb-0 md:ml-auto w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by blog title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 border border-[#2a2926] rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2a2926] focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
        )}

        {/* Menu Button (Always Visible in Mobile View) */}

        {/* Navigation Links for Desktop View */}
        <nav className="hidden md:flex items-center space-x-4">
          {!(isLoggedin === "true") ? (
            <>
              <Link
                className="link text-[#2a2926] hover:text-black transition py-2 flex items-center"
                to="/"
              >
                Home
              </Link>
              <Link
                className="link text-[#2a2926] hover:text-black transition py-2 flex items-center"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="link text-[#2a2926] hover:text-black transition py-2 flex items-center"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-md flex items-center">Hello, {email}</h1>
              <Link
                className="link text-[#2a2926] hover:text-black transition py-2 flex items-center"
                to="/create"
              >
                Write
              </Link>
              <Link
                className="link text-[#2a2926] hover:text-black transition py-2 flex items-center"
                to="/"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="link text-[#2a2926] hover:text-black transition py-2 flex items-center"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#e7dfd8] p-4 mt-2 rounded-lg shadow-lg">
          {!(isLoggedin === "true") ? (
            <>
              <Link
                className="block text-[#2a2926] hover:text-black transition py-2"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="block text-[#2a2926] hover:text-black transition py-2"
                to="/signup"
              >
                Sign Up
              </Link>
              <Link
                className="block text-[#2a2926] hover:text-black transition py-2"
                to="/"
              >
                Home
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-md mb-2">Hello, {email}</h1>
              <Link
                className="block text-[#2a2926] hover:text-black transition py-2"
                to="/create"
              >
                Write
              </Link>
              <Link
                className="block text-[#2a2926] hover:text-black transition py-2"
                to="/"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="block text-[#2a2926] hover:text-black transition py-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
