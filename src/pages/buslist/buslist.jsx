import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { FaFilter, FaSort, FaArrowRight, FaRegClock, FaChair, FaBus } from "react-icons/fa";
import RootLayout from "../../component/layout/RootLayout";
import Search from "../search/search";


const sampleBuses = [
  {
    id: "bus1",
    name: "Volvo A/C Sleeper",
    type: "Sleeper",
    departureTime: "07:30 AM",
    arrivalTime: "05:30 PM",
    duration: "10h",
    availableSeats: 21,
    fare: 1200,
    rating: 4.5,
    amenities: ["WiFi", "USB Charging", "Blanket"]
  },
  {
    id: "bus2",
    name: "Express Non-A/C Seater",
    type: "Seater",
    departureTime: "09:00 AM",
    arrivalTime: "06:00 PM",
    duration: "9h",
    availableSeats: 15,
    fare: 800,
    rating: 3.8,
    amenities: ["Water Bottle", "USB Charging"]
  },
  {
    id: "bus3",
    name: "Premium A/C Sleeper",
    type: "Sleeper",
    departureTime: "10:30 PM",
    arrivalTime: "06:30 AM",
    duration: "8h",
    availableSeats: 8,
    fare: 1500,
    rating: 4.7,
    amenities: ["WiFi", "USB Charging", "Blanket", "Snacks"]
  },
  {
    id: "bus4",
    name: "Super Express A/C",
    type: "Seater",
    departureTime: "02:00 PM",
    arrivalTime: "10:00 PM",
    duration: "8h",
    availableSeats: 19,
    fare: 1100,
    rating: 4.2,
    amenities: ["WiFi", "USB Charging", "Water Bottle"]
  },
  {
    id: "bus5",
    name: "Luxury Volvo A/C",
    type: "Sleeper",
    departureTime: "11:30 PM",
    arrivalTime: "07:30 AM",
    duration: "8h",
    availableSeats: 5,
    fare: 1800,
    rating: 4.9,
    amenities: ["WiFi", "USB Charging", "Blanket", "Pillow", "Snacks"]
  }
];

const BusList = () => {
  const { searchData, loading, buses, setSelectedBus } = useBooking();
  const navigate = useNavigate();

  // Use sample data for demo, replace with actual API data
  const [filteredBuses, setFilteredBuses] = useState(sampleBuses);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [500, 2000],
    departureTime: "all",
    busType: "all"
  });
  const [sortOption, setSortOption] = useState("price");
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...sampleBuses]; 

    // Filter by price range
    filtered = filtered.filter(bus =>
      bus.fare >= activeFilters.priceRange[0] &&
      bus.fare <= activeFilters.priceRange[1]
    );

    // Filter by departure time
    if (activeFilters.departureTime !== "all") {
      if (activeFilters.departureTime === "morning") {
        filtered = filtered.filter(bus =>
          bus.departureTime.includes("AM")
        );
      } else if (activeFilters.departureTime === "evening") {
        filtered = filtered.filter(bus =>
          bus.departureTime.includes("PM") && parseInt(bus.departureTime.split(":")[0]) < 8
        );
      } else if (activeFilters.departureTime === "night") {
        filtered = filtered.filter(bus =>
          bus.departureTime.includes("PM") && parseInt(bus.departureTime.split(":")[0]) >= 8
        );
      }
    }

    // Filter by bus type
    if (activeFilters.busType !== "all") {
      filtered = filtered.filter(bus =>
        bus.type.toLowerCase() === activeFilters.busType.toLowerCase()
      );
    }

    // Apply sorting
    if (sortOption === "price") {
      filtered.sort((a, b) => a.fare - b.fare);
    } else if (sortOption === "departure") {
      filtered.sort((a, b) => {
        const timeA = new Date(`2022/01/01 ${a.departureTime}`);
        const timeB = new Date(`2022/01/01 ${b.departureTime}`);
        return timeA - timeB;
      });
    } else if (sortOption === "duration") {
      filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredBuses(filtered);
  };

  // Handle bus selection
  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    navigate(`/seat-selection/${bus.id}`);
  };

  // Apply filters on mount and when filters change
  useEffect(() => {
    applyFilters();
  }, [activeFilters, sortOption]);

  return (
    <RootLayout>
      <div className="py-6">
        <Search />

        {/* Journey Info */}
        <div className="mt-6 mb-4 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center text-gray-700 dark:text-gray-200">
              <span className="font-medium">{searchData.fromLocation || "Source"}</span>
              <FaArrowRight className="mx-2" />
              <span className="font-medium">{searchData.toLocation || "Destination"}</span>
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {searchData.journeyDate ? new Date(searchData.journeyDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : "Select Date"}
            </div>
          </div>
        </div>

        {/* Filters and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 my-4">
          <div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Sort by:</div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
            >
              <option value="price">Price</option>
              <option value="departure">Departure Time</option>
              <option value="duration">Duration</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Price Range</h3>
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">₹{activeFilters.priceRange[0]}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">₹{activeFilters.priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    step="100"
                    value={activeFilters.priceRange[0]}
                    onChange={(e) => setActiveFilters({
                      ...activeFilters,
                      priceRange: [parseInt(e.target.value), activeFilters.priceRange[1]]
                    })}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    step="100"
                    value={activeFilters.priceRange[1]}
                    onChange={(e) => setActiveFilters({
                      ...activeFilters,
                      priceRange: [activeFilters.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Departure Time Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Departure Time</h3>
                <select
                  value={activeFilters.departureTime}
                  onChange={(e) => setActiveFilters({
                    ...activeFilters,
                    departureTime: e.target.value
                  })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
                >
                  <option value="all">All Times</option>
                  <option value="morning">Morning (12AM - 12PM)</option>
                  <option value="evening">Evening (12PM - 8PM)</option>
                  <option value="night">Night (8PM - 12AM)</option>
                </select>
              </div>

              {/* Bus Type Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Bus Type</h3>
                <select
                  value={activeFilters.busType}
                  onChange={(e) => setActiveFilters({
                    ...activeFilters,
                    busType: e.target.value
                  })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200"
                >
                  <option value="all">All Types</option>
                  <option value="sleeper">Sleeper</option>
                  <option value="seater">Seater</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bus List */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBuses.map((bus) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{bus.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <FaBus className="text-gray-400" />
                      <span>{bus.type}</span>
                      <span className="px-1">•</span>
                      <div className="flex items-center">
                        <FaChair className="text-gray-400 mr-1" />
                        <span>{bus.availableSeats} seats available</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {bus.amenities.map((amenity, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center justify-between md:justify-end gap-2 md:gap-6 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{bus.departureTime}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Departure</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center">
                          <FaRegClock className="mr-1" />
                          {bus.duration}
                        </div>
                        <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 my-1 relative">
                          <div className="absolute w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 -left-1 -top-0.5"></div>
                          <div className="absolute w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 -right-1 -top-0.5"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{bus.arrivalTime}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Arrival</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        ₹{bus.fare}
                      </div>

                      <button
                        onClick={() => handleSelectBus(bus)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white font-medium rounded-lg transition-colors"
                      >
                        Select Seats
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredBuses.length === 0 && (
              <div className="py-16 text-center">
                <div className="text-4xl mb-4">😢</div>
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">No buses found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try changing your filters or search for different dates</p>
              </div>
            )}
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default BusList;
