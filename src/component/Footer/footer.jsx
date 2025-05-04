import { FaBus, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const Footer = () => {
  const { darkMode } = useBooking();

  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'} py-8 px-4 mt-10 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-4">
              <FaBus className={`text-primary ${darkMode ? 'text-blue-400' : ''} text-xl mr-2`} />
              <h2 className="text-lg font-semibold">BusBook</h2>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
              Book bus tickets quickly and easily with our intuitive booking platform. Safe, secure, and hassle-free travel planning.
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} BusBook. All rights reserved.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <li>
                <Link to="/" className={`hover:text-primary ${darkMode ? 'hover:text-blue-400' : ''} transition-colors`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buses" className={`hover:text-primary ${darkMode ? 'hover:text-blue-400' : ''} transition-colors`}>
                  Bus Tickets
                </Link>
              </li>
              <li>
                <a href="#about" className={`hover:text-primary ${darkMode ? 'hover:text-blue-400' : ''} transition-colors`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#faq" className={`hover:text-primary ${darkMode ? 'hover:text-blue-400' : ''} transition-colors`}>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#terms" className={`hover:text-primary ${darkMode ? 'hover:text-blue-400' : ''} transition-colors`}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className={`hover:text-primary ${darkMode ? 'hover:text-blue-400' : ''} transition-colors`}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contact Us</h3>
            <ul className={`space-y-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2" />
                <span>123 Bus Station Road, Transport City, 110001</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>support@busbook.com</span>
              </li>
            </ul>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-3 py-2 text-sm rounded-l-md focus:outline-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-800'
                  } border`}
                />
                <button
                  className="bg-primary hover:bg-primary-dark text-white px-3 py-2 text-sm font-medium rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
