import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTicketAlt, FaDownload, FaHome, FaUser, FaPhone, FaEnvelope, FaBus, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";
import RootLayout from "../../component/layout/RootLayout";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const {
    selectedBus,
    selectedSeats,
    passengerDetails,
    calculateTotalFare,
    resetBookingData
  } = useBooking();

  const [showConfetti, setShowConfetti] = useState(true);
  const [bookingReference] = useState(`BUS${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);

  // Redirect if passenger details are not provided
  useEffect(() => {
    if (!selectedSeats.length || !passengerDetails.name) {
      navigate("/");
    }
  }, [selectedSeats, passengerDetails, navigate]);

  // Hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Format date for display
  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle go to home button
  const handleGoHome = () => {
    resetBookingData();
    navigate("/");
  };

  return (
    <RootLayout>
      <div className="py-6 relative">
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  top: "-10%",
                  left: `${Math.random() * 100}%`,
                  rotate: Math.random() * 360
                }}
                animate={{
                  top: "100%",
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="absolute w-2 h-8"
                style={{
                  background: `hsl(${Math.random() * 360}, 80%, 60%)`,
                  borderRadius: '2px',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-center mb-8"
          >
            <div className="inline-block p-6 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
              <FaCheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-300">Your bus tickets have been booked successfully</p>
          </motion.div>

          {/* Booking Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-primary dark:bg-primary-dark p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaTicketAlt className="text-lg" />
                  <h2 className="text-xl font-semibold">Booking Details</h2>
                </div>
                <div className="text-sm opacity-90">
                  {formatDate()}
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className="opacity-90">Booking Reference:</span>{" "}
                <span className="font-bold tracking-wide">{bookingReference}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-6">
              {/* Journey Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Journey Details</h3>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Bus</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                        <FaBus className="text-gray-400 dark:text-gray-500" />
                        {selectedBus?.name || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Travel Date</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400 dark:text-gray-500" />
                        {new Date().toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500 dark:text-gray-400">From</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">{selectedBus?.departureTime || "N/A"}</div>
                    </div>

                    <div className="flex-1 flex justify-center items-center px-4">
                      <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600 relative">
                        <FaArrowRight className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-1 text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">To</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">{selectedBus?.arrivalTime || "N/A"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Passenger Details</h3>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                        <FaUser className="text-gray-400 dark:text-gray-500" />
                        {passengerDetails.name}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Age / Gender</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {passengerDetails.age} / {passengerDetails.gender.charAt(0).toUpperCase() + passengerDetails.gender.slice(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                        <FaEnvelope className="text-gray-400 dark:text-gray-500" />
                        {passengerDetails.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                        <FaPhone className="text-gray-400 dark:text-gray-500" />
                        {passengerDetails.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seat & Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Seat Details</h3>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Selected Seats</div>
                    <div className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                      {selectedSeats.map(seat => seat.id).join(", ")}
                    </div>
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">Total Seats</div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {selectedSeats.length}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Payment Details</h3>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Ticket Price</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        ₹{selectedSeats[0]?.price || 0} x {selectedSeats.length}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Service Fee</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">₹25</div>
                    </div>
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-800 dark:text-gray-200">Total Amount</div>
                        <div className="font-bold text-lg text-primary dark:text-blue-400">
                          ₹{calculateTotalFare() + 25}
                        </div>
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1 text-right">
                        Payment Successful
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between">
              <button
                onClick={handleGoHome}
                className="order-2 sm:order-1 px-6 py-2 border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark font-medium rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <FaHome />
                Return to Home
              </button>

              <button
                className="order-1 sm:order-2 px-6 py-2 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => window.print()}
              >
                <FaDownload />
                Download Ticket
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </RootLayout>
  );
};

export default BookingConfirmation;
