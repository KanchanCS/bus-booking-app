import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useBooking();
  const location = useLocation();

  // Apply dark mode on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="z-30 sticky top-0 text-dark shadow-md px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <span className="font-bold text-lg text-primary dark:text-blue-400">BusBook</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`hover:text-primary dark:hover:text-blue-400 font-medium transition-colors ${
              location.pathname === '/' ? 'text-primary dark:text-blue-400' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/buses"
            className={`hover:text-primary dark:hover:text-blue-400 font-medium transition-colors ${
              location.pathname === '/buses' ? 'text-primary dark:text-blue-400' : ''
            }`}
          >
            Bus Tickets
          </Link>
        </nav>

        {/* Dark mode toggle */}
        <motion.button
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
