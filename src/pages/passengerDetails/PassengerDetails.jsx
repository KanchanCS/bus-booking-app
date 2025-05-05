import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaInfoCircle, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";
import RootLayout from "../../component/layout/RootLayout";

const PassengerDetails = () => {
  const navigate = useNavigate();
  const {
    selectedBus,
    selectedSeats,
    passengerDetails,
    setPassengerDetails,
    calculateTotalFare,
    createTempBooking
  } = useBooking();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [showTimer, setShowTimer] = useState(true);

  // Redirect if no seats are selected
  useEffect(() => {
    if (!selectedSeats.length) {
      navigate("/buses");
    }
  }, [selectedSeats, navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setShowTimer(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPassengerDetails({
      ...passengerDetails,
      [name]: value
    });

    // Clear the error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!passengerDetails.name.trim()) {
      errors.name = "Name is required";
    } else if (passengerDetails.name.trim().length < 3) {
      errors.name = "Name should be at least 3 characters";
    }

    // Age validation
    if (!passengerDetails.age) {
      errors.age = "Age is required";
    } else if (isNaN(passengerDetails.age) || parseInt(passengerDetails.age) < 1 || parseInt(passengerDetails.age) > 120) {
      errors.age = "Enter a valid age between 1 and 120";
    }

    // Gender validation
    if (!passengerDetails.gender) {
      errors.gender = "Gender is required";
    }

    // Email validation
    if (!passengerDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(passengerDetails.email)) {
      errors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!passengerDetails.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(passengerDetails.phone.trim())) {
      errors.phone = "Enter a valid 10-digit phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
    
        setTimeout(() => {
          navigate("/booking-confirmation");
          setIsSubmitting(false);
        }, 1500);
      // }
    } catch (error) {
      console.error("Error creating booking:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <RootLayout>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/seat-selection/" + selectedBus?.id)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark"
          >
            <FaArrowLeft className="mr-2" />
            Back to Seat Selection
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Passenger Details</h1>

        {showTimer && (
          <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50 text-sm text-yellow-800 dark:text-yellow-300 flex items-center justify-center">
            <div className="font-medium">
              Please complete your booking within {formatTime(countdown)} to keep your seats reserved.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={passengerDetails.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                          formErrors.name
                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-colors`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Age and Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Age<span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        min="1"
                        max="120"
                        value={passengerDetails.age}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          formErrors.age
                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-colors`}
                        placeholder="Enter your age"
                      />
                      {formErrors.age && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.age}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gender<span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={passengerDetails.gender}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          formErrors.gender
                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-colors`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.gender && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.gender}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={passengerDetails.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                          formErrors.email
                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-colors`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={passengerDetails.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                          formErrors.phone
                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                        } text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-colors`}
                        placeholder="Enter your 10-digit phone number"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-70 cursor-wait' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue to Payment
                          <FaArrowRight className="text-sm" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right: Booking Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Booking Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Bus:</span>
                  <span className="font-medium">{selectedBus?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Departure:</span>
                  <span className="font-medium">{selectedBus?.departureTime || "N/A"}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Arrival:</span>
                  <span className="font-medium">{selectedBus?.arrivalTime || "N/A"}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Selected Seats:</span>
                  <span className="font-medium">{selectedSeats.map(seat => seat.id).join(", ")}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Seats Count:</span>
                  <span className="font-medium">{selectedSeats.length}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-gray-800 dark:text-gray-200">
                  <span>Total Amount:</span>
                  <span>₹{calculateTotalFare()}</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-600 dark:text-blue-300 flex items-start">
                <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Payment will be processed in the next step after confirming your details.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default PassengerDetails;
