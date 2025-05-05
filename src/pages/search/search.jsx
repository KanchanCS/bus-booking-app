import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TbArrowsExchange } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";


const locationData = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Jaipur", "Lucknow", "Ahmedabad",
  "Chandigarh", "Surat", "Kochi", "Indore", "Noida"
];

function Search() {
  const { searchData, setSearchData, searchBuses, loading } = useBooking();
  const navigate = useNavigate();

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Filter locations based on input
  const filterLocations = (input) => {
    return locationData.filter(location =>
      location.toLowerCase().includes(input.toLowerCase())
    );
  };

  // Handle from location input change
  const handleFromChange = (e) => {
    const value = e.target.value;
    setSearchData({ ...searchData, fromLocation: value });
    setFromSuggestions(filterLocations(value));
    setShowFromSuggestions(value.length > 0);
  };

  // Handle to location input change
  const handleToChange = (e) => {
    const value = e.target.value;
    setSearchData({ ...searchData, toLocation: value });
    setToSuggestions(filterLocations(value));
    setShowToSuggestions(value.length > 0);
  };

  // Select a suggestion for from location
  const selectFromSuggestion = (location) => {
    setSearchData({ ...searchData, fromLocation: location });
    setShowFromSuggestions(false);
  };

  // Select a suggestion for to location
  const selectToSuggestion = (location) => {
    setSearchData({ ...searchData, toLocation: location });
    setShowToSuggestions(false);
  };

  // Exchange from and to locations
  const handleExchange = () => {
    setSearchData({
      ...searchData,
      fromLocation: searchData.toLocation,
      toLocation: searchData.fromLocation
    });
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSearchData({ ...searchData, journeyDate: e.target.value });
  };

  // Handle search button click
  const handleSearch = async () => {
    if (!searchData.fromLocation || !searchData.toLocation || !searchData.journeyDate) {
      alert('Please fill all fields');
      return;
    }

    await searchBuses();
    navigate('/buses');
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-white dark:bg-gray-800 border-2 border-neutral-300 dark:border-gray-700 shadow-lg rounded-xl p-5 mt-5"
      >
        <div className="w-full flex flex-col lg:flex-row items-center gap-5">
          {/* From and To Section */}
          <div className="w-full lg:w-[60%] flex flex-col sm:flex-row items-center gap-5 relative">
            {/* From */}
            <div ref={fromRef} className="w-full sm:w-1/2 relative">
              <div className="h-12 border border-neutral-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700 text-base text-neutral-700 dark:text-gray-200 font-medium px-5 flex items-center gap-x-1 rounded-lg">
                <input
                  type="text"
                  placeholder="From.."
                  className="flex-1 h-full border-none bg-transparent focus:outline-none dark:placeholder-gray-400"
                  value={searchData.fromLocation}
                  onChange={handleFromChange}
                  onFocus={() => setShowFromSuggestions(true)}
                />
                <div className="w-5 h-5 text-neutral-800 dark:text-gray-300">
                  <FaMapMarkerAlt className="w-full h-full" />
                </div>
              </div>

              {/* From Suggestions */}
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-700 shadow-lg rounded-lg max-h-60 overflow-y-auto"
                >
                  {fromSuggestions.map((location, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                      onClick={() => selectFromSuggestion(location)}
                    >
                      {location}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* To */}
            <div ref={toRef} className="w-full sm:w-1/2 relative">
              <div className="h-12 border border-neutral-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700 text-base text-neutral-700 dark:text-gray-200 font-medium px-5 flex items-center gap-x-1 rounded-lg">
                <input
                  type="text"
                  placeholder="To.."
                  className="flex-1 h-full border-none bg-transparent focus:outline-none dark:placeholder-gray-400"
                  value={searchData.toLocation}
                  onChange={handleToChange}
                  onFocus={() => setShowToSuggestions(true)}
                />
                <div className="w-5 h-5 text-neutral-800 dark:text-gray-300">
                  <FaMapMarkerAlt className="w-full h-full" />
                </div>
              </div>

              {/* To Suggestions */}
              {showToSuggestions && toSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-700 shadow-lg rounded-lg max-h-60 overflow-y-auto"
                >
                  {toSuggestions.map((location, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                      onClick={() => selectToSuggestion(location)}
                    >
                      {location}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Exchange Button */}
            <button
              onClick={handleExchange}
              className="absolute w-9 h-9 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary shadow-md z-10 transition-colors duration-300"
            >
              <TbArrowsExchange className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Date and Search Section */}
          <div className="w-full lg:w-[40%] flex flex-col sm:flex-row items-center gap-5 px-0 lg:px-5">
            {/* Date */}
            <div className="flex-1 w-full h-12 border border-neutral-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700 text-base text-neutral-700 dark:text-gray-200 font-medium px-5 flex items-center gap-x-1 rounded-lg">
              <input
                type="date"
                min={today}
                className="flex-1 h-full border-none bg-transparent focus:outline-none dark:text-gray-200"
                value={searchData.journeyDate}
                onChange={handleDateChange}
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`w-full sm:w-fit px-5 h-12 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary border-2 border-primary hover:border-primary-dark dark:border-primary-dark dark:hover:border-primary rounded-xl text-base font-medium text-white flex items-center gap-x-2 justify-center transition-all duration-300 ease-in-out ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaSearch />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Search;
