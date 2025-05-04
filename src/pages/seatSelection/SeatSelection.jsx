import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaInfo, FaArrowRight } from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";
import RootLayout from "../../component/layout/RootLayout";

// Sample seat layouts for demo purposes (replace with API response)
const seatLayouts = {
  bus1: {
    type: "sleeper",
    rows: 9,
    columns: 4,
    layout: [
      [{ id: "A1", isAvailable: true, price: 1200 }, null, { id: "A2", isAvailable: false, price: 1200 }, { id: "A3", isAvailable: true, price: 1200 }],
      [{ id: "B1", isAvailable: true, price: 1200 }, null, { id: "B2", isAvailable: true, price: 1200 }, { id: "B3", isAvailable: true, price: 1200 }],
      [{ id: "C1", isAvailable: false, price: 1200 }, null, { id: "C2", isAvailable: true, price: 1200 }, { id: "C3", isAvailable: true, price: 1200 }],
      [{ id: "D1", isAvailable: true, price: 1200 }, null, { id: "D2", isAvailable: true, price: 1200 }, { id: "D3", isAvailable: false, price: 1200 }],
      [{ id: "E1", isAvailable: true, price: 1200 }, null, { id: "E2", isAvailable: true, price: 1200 }, { id: "E3", isAvailable: true, price: 1200 }],
      [{ id: "F1", isAvailable: true, price: 1200 }, null, { id: "F2", isAvailable: true, price: 1200 }, { id: "F3", isAvailable: true, price: 1200 }],
      [{ id: "G1", isAvailable: false, price: 1200 }, null, { id: "G2", isAvailable: false, price: 1200 }, { id: "G3", isAvailable: true, price: 1200 }],
      [{ id: "H1", isAvailable: true, price: 1200 }, null, { id: "H2", isAvailable: true, price: 1200 }, { id: "H3", isAvailable: true, price: 1200 }],
      [{ id: "I1", isAvailable: true, price: 1200 }, null, { id: "I2", isAvailable: true, price: 1200 }, { id: "I3", isAvailable: true, price: 1200 }],
    ]
  },
  bus2: {
    type: "seater",
    rows: 10,
    columns: 4,
    layout: [
      [{ id: "A1", isAvailable: true, price: 800 }, { id: "A2", isAvailable: true, price: 800 }, null, { id: "A3", isAvailable: true, price: 800 }, { id: "A4", isAvailable: true, price: 800 }],
      [{ id: "B1", isAvailable: false, price: 800 }, { id: "B2", isAvailable: false, price: 800 }, null, { id: "B3", isAvailable: true, price: 800 }, { id: "B4", isAvailable: true, price: 800 }],
      [{ id: "C1", isAvailable: true, price: 800 }, { id: "C2", isAvailable: true, price: 800 }, null, { id: "C3", isAvailable: true, price: 800 }, { id: "C4", isAvailable: true, price: 800 }],
      [{ id: "D1", isAvailable: true, price: 800 }, { id: "D2", isAvailable: true, price: 800 }, null, { id: "D3", isAvailable: false, price: 800 }, { id: "D4", isAvailable: false, price: 800 }],
      [{ id: "E1", isAvailable: true, price: 800 }, { id: "E2", isAvailable: true, price: 800 }, null, { id: "E3", isAvailable: true, price: 800 }, { id: "E4", isAvailable: true, price: 800 }],
      [{ id: "F1", isAvailable: true, price: 800 }, { id: "F2", isAvailable: true, price: 800 }, null, { id: "F3", isAvailable: true, price: 800 }, { id: "F4", isAvailable: true, price: 800 }],
      [{ id: "G1", isAvailable: false, price: 800 }, { id: "G2", isAvailable: false, price: 800 }, null, { id: "G3", isAvailable: true, price: 800 }, { id: "G4", isAvailable: true, price: 800 }],
      [{ id: "H1", isAvailable: true, price: 800 }, { id: "H2", isAvailable: true, price: 800 }, null, { id: "H3", isAvailable: true, price: 800 }, { id: "H4", isAvailable: true, price: 800 }],
      [{ id: "I1", isAvailable: true, price: 800 }, { id: "I2", isAvailable: true, price: 800 }, null, { id: "I3", isAvailable: true, price: 800 }, { id: "I4", isAvailable: true, price: 800 }],
      [{ id: "J1", isAvailable: true, price: 800 }, { id: "J2", isAvailable: true, price: 800 }, null, { id: "J3", isAvailable: true, price: 800 }, { id: "J4", isAvailable: true, price: 800 }],
    ]
  },
  bus3: {
    type: "sleeper",
    rows: 7,
    columns: 4,
    layout: [
      [{ id: "A1", isAvailable: true, price: 1500 }, null, { id: "A2", isAvailable: true, price: 1500 }, { id: "A3", isAvailable: true, price: 1500 }],
      [{ id: "B1", isAvailable: true, price: 1500 }, null, { id: "B2", isAvailable: false, price: 1500 }, { id: "B3", isAvailable: false, price: 1500 }],
      [{ id: "C1", isAvailable: true, price: 1500 }, null, { id: "C2", isAvailable: true, price: 1500 }, { id: "C3", isAvailable: true, price: 1500 }],
      [{ id: "D1", isAvailable: false, price: 1500 }, null, { id: "D2", isAvailable: true, price: 1500 }, { id: "D3", isAvailable: true, price: 1500 }],
      [{ id: "E1", isAvailable: true, price: 1500 }, null, { id: "E2", isAvailable: true, price: 1500 }, { id: "E3", isAvailable: true, price: 1500 }],
      [{ id: "F1", isAvailable: true, price: 1500 }, null, { id: "F2", isAvailable: true, price: 1500 }, { id: "F3", isAvailable: true, price: 1500 }],
      [{ id: "G1", isAvailable: true, price: 1500 }, null, { id: "G2", isAvailable: true, price: 1500 }, { id: "G3", isAvailable: true, price: 1500 }],
    ]
  },
  bus4: {
    type: "seater",
    rows: 9,
    columns: 5,
    layout: [
      [{ id: "A1", isAvailable: true, price: 1100 }, { id: "A2", isAvailable: true, price: 1100 }, null, { id: "A3", isAvailable: true, price: 1100 }, { id: "A4", isAvailable: true, price: 1100 }],
      [{ id: "B1", isAvailable: false, price: 1100 }, { id: "B2", isAvailable: false, price: 1100 }, null, { id: "B3", isAvailable: true, price: 1100 }, { id: "B4", isAvailable: true, price: 1100 }],
      [{ id: "C1", isAvailable: true, price: 1100 }, { id: "C2", isAvailable: true, price: 1100 }, null, { id: "C3", isAvailable: true, price: 1100 }, { id: "C4", isAvailable: true, price: 1100 }],
      [{ id: "D1", isAvailable: true, price: 1100 }, { id: "D2", isAvailable: true, price: 1100 }, null, { id: "D3", isAvailable: false, price: 1100 }, { id: "D4", isAvailable: false, price: 1100 }],
      [{ id: "E1", isAvailable: true, price: 1100 }, { id: "E2", isAvailable: true, price: 1100 }, null, { id: "E3", isAvailable: true, price: 1100 }, { id: "E4", isAvailable: true, price: 1100 }],
      [{ id: "F1", isAvailable: true, price: 1100 }, { id: "F2", isAvailable: true, price: 1100 }, null, { id: "F3", isAvailable: true, price: 1100 }, { id: "F4", isAvailable: true, price: 1100 }],
      [{ id: "G1", isAvailable: false, price: 1100 }, { id: "G2", isAvailable: false, price: 1100 }, null, { id: "G3", isAvailable: true, price: 1100 }, { id: "G4", isAvailable: true, price: 1100 }],
      [{ id: "H1", isAvailable: true, price: 1100 }, { id: "H2", isAvailable: true, price: 1100 }, null, { id: "H3", isAvailable: true, price: 1100 }, { id: "H4", isAvailable: true, price: 1100 }],
      [{ id: "I1", isAvailable: true, price: 1100 }, { id: "I2", isAvailable: true, price: 1100 }, null, { id: "I3", isAvailable: true, price: 1100 }, { id: "I4", isAvailable: true, price: 1100 }],
    ]
  },
  bus5: {
    type: "sleeper",
    rows: 8,
    columns: 4,
    layout: [
      [{ id: "A1", isAvailable: true, price: 1800 }, null, { id: "A2", isAvailable: true, price: 1800 }, { id: "A3", isAvailable: true, price: 1800 }],
      [{ id: "B1", isAvailable: false, price: 1800 }, null, { id: "B2", isAvailable: false, price: 1800 }, { id: "B3", isAvailable: false, price: 1800 }],
      [{ id: "C1", isAvailable: true, price: 1800 }, null, { id: "C2", isAvailable: true, price: 1800 }, { id: "C3", isAvailable: true, price: 1800 }],
      [{ id: "D1", isAvailable: true, price: 1800 }, null, { id: "D2", isAvailable: true, price: 1800 }, { id: "D3", isAvailable: true, price: 1800 }],
      [{ id: "E1", isAvailable: true, price: 1800 }, null, { id: "E2", isAvailable: true, price: 1800 }, { id: "E3", isAvailable: true, price: 1800 }],
      [{ id: "F1", isAvailable: false, price: 1800 }, null, { id: "F2", isAvailable: false, price: 1800 }, { id: "F3", isAvailable: true, price: 1800 }],
      [{ id: "G1", isAvailable: true, price: 1800 }, null, { id: "G2", isAvailable: true, price: 1800 }, { id: "G3", isAvailable: true, price: 1800 }],
      [{ id: "H1", isAvailable: true, price: 1800 }, null, { id: "H2", isAvailable: true, price: 1800 }, { id: "H3", isAvailable: true, price: 1800 }],
    ]
  },
};

const SeatSelection = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, setSelectedSeats, calculateTotalFare } = useBooking();
  const [seatLayout, setSeatLayout] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load seat layout
  useEffect(() => {
    const fetchSeatLayout = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch this from the API using getSeatMap function from context
        // For demo, use the sample layouts
        setTimeout(() => {
          setSeatLayout(seatLayouts[busId]);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching seat layout:", error);
        setLoading(false);
      }
    };

    fetchSeatLayout();
  }, [busId]);

  // Handle seat selection/deselection
  const handleSeatClick = (seat) => {
    if (!seat || !seat.isAvailable) return;

    const isSeatSelected = selectedSeats.some(s => s.id === seat.id);

    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat }]);
    }
  };

  // Handle continue button click
  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to continue");
      return;
    }
    navigate("/passenger-details");
  };

  // Check if a seat is selected
  const isSeatSelected = (seatId) => {
    return selectedSeats.some(seat => seat.id === seatId);
  };

  // Show tooltip on hover
  const showTooltip = (e, seat) => {
    if (!seat) return;

    setTooltipInfo({
      id: seat.id,
      price: seat.price,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Hide tooltip
  const hideTooltip = () => {
    setTooltipInfo(null);
  };

  // Bus details component
  const BusDetails = () => (
    <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {selectedBus?.name || "Select a Bus"}
      </h2>
      <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-1">
          <span className="font-medium">From:</span> {selectedBus?.departureTime || "N/A"}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">To:</span> {selectedBus?.arrivalTime || "N/A"}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Type:</span> {selectedBus?.type || "N/A"}
        </div>
      </div>
    </div>
  );

  // Render seat based on type
  const renderSeat = (seat, rowIndex, colIndex) => {
    if (!seat) return <div key={`empty-${rowIndex}-${colIndex}`} className="w-10 h-10"></div>;

    const isSelected = isSeatSelected(seat.id);
    const seatType = seatLayout?.type || 'seater';

    let seatClass = "relative flex items-center justify-center rounded-md cursor-pointer transition-all duration-200 ";

    if (seatType === 'sleeper') {
      seatClass += "w-12 h-20 ";
    } else {
      seatClass += "w-10 h-10 ";
    }

    if (!seat.isAvailable) {
      seatClass += "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed";
    } else if (isSelected) {
      seatClass += "bg-primary dark:bg-primary-dark text-white border-2 border-white dark:border-gray-800 transform scale-105";
    } else {
      seatClass += "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50";
    }

    return (
      <motion.div
        key={seat.id}
        className={seatClass}
        onClick={() => handleSeatClick(seat)}
        onMouseEnter={(e) => showTooltip(e, seat)}
        onMouseLeave={hideTooltip}
        whileHover={{ scale: seat.isAvailable ? 1.05 : 1 }}
        whileTap={{ scale: seat.isAvailable ? 0.95 : 1 }}
      >
        <span className="text-xs font-medium">{seat.id}</span>
      </motion.div>
    );
  };

  return (
    <RootLayout>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/buses")}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark"
          >
            <FaArrowLeft className="mr-2" />
            Back to Bus List
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Select Your Seats</h1>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Seat Selection */}
            <div className="lg:col-span-2">
              <BusDetails />

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                {/* Seat legend */}
                <div className="flex items-center justify-center gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-green-100 dark:bg-green-900/30"></div>
                    <span className="text-gray-600 dark:text-gray-300">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-primary dark:bg-primary-dark"></div>
                    <span className="text-gray-600 dark:text-gray-300">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-gray-600 dark:text-gray-300">Booked</span>
                  </div>
                </div>

                {/* Bus front */}
                <div className="relative flex justify-center mb-8">
                  <div className="w-32 h-12 rounded-t-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    Driver
                  </div>
                </div>

                {/* Seat map */}
                <div className="flex justify-center">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-lg">
                    <div className="grid gap-4">
                      {seatLayout?.layout?.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2 justify-center">
                          {row.map((seat, colIndex) => renderSeat(seat, rowIndex, colIndex))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tooltip */}
                {tooltipInfo && (
                  <div
                    className="fixed bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50 text-sm pointer-events-none border border-gray-200 dark:border-gray-700"
                    style={{
                      left: `${tooltipInfo.x + 10}px`,
                      top: `${tooltipInfo.y + 10}px`,
                    }}
                  >
                    <div className="font-medium">Seat: {tooltipInfo.id}</div>
                    <div>Price: ₹{tooltipInfo.price}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Booking Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Booking Summary</h2>

                {selectedSeats.length > 0 ? (
                  <>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>Selected Seats:</span>
                        <span className="font-medium">{selectedSeats.map(seat => seat.id).join(", ")}</span>
                      </div>
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>Seats Count:</span>
                        <span className="font-medium">{selectedSeats.length}</span>
                      </div>
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>Price per Seat:</span>
                        <span className="font-medium">₹{selectedSeats[0]?.price}</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-gray-800 dark:text-gray-200">
                        <span>Total Amount:</span>
                        <span>₹{calculateTotalFare()}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-600 dark:text-blue-300 flex items-start mb-4">
                      <FaInfo className="mr-2 mt-0.5 flex-shrink-0" />
                      <span>You will need to provide passenger details in the next step.</span>
                    </div>

                    <button
                      onClick={handleContinue}
                      className="w-full py-3 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Continue
                      <FaArrowRight className="text-sm" />
                    </button>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <div className="text-4xl mb-4">🪑</div>
                    <p className="text-gray-500 dark:text-gray-400">Please select your seats from the seat map</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default SeatSelection;
