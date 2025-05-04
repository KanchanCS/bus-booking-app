import { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    fromLocation: '',
    toLocation: '',
    journeyDate: '',
  });

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
  });
  const [bookingData, setBookingData] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Search buses
  const searchBuses = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://uat.travl.tech/api/bus/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: searchData.fromLocation,
          destination: searchData.toLocation,
          journeyDate: searchData.journeyDate,
        }),
      });

      const data = await response.json();
      setBuses(data.buses || []);
    } catch (error) {
      console.error('Error searching buses:', error);
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  // Get seat map
  const getSeatMap = async (busId, seatMapType = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://uat.travl.tech/api/bus/seatmap?resp=${seatMapType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          busId,
        }),
      });

      const data = await response.json();
      return data.seatMap;
    } catch (error) {
      console.error('Error fetching seat map:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create temporary booking
  const createTempBooking = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://uat.travl.tech/api/bus/temp-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          busId: selectedBus.id,
          seats: selectedSeats,
          passengerDetails,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating temp booking:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Process payment
  const processPayment = async (tempBookingId) => {
    try {
      setLoading(true);
      const response = await fetch('https://uat.travl.tech/api/bus/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: tempBookingId,
          paymentMethod: 'card',
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error processing payment:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Confirm booking
  const confirmBooking = async (paymentId) => {
    try {
      setLoading(true);
      const response = await fetch('https://uat.travl.tech/api/bus/confirm-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
        }),
      });

      const data = await response.json();
      setBookingData(data);
      return data;
    } catch (error) {
      console.error('Error confirming booking:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Calculate total fare
  const calculateTotalFare = () => {
    if (!selectedBus || !selectedSeats.length) return 0;
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const resetBookingData = () => {
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassengerDetails({
      name: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
    });
    setBookingData(null);
  };

  return (
    <BookingContext.Provider
      value={{
        searchData,
        setSearchData,
        buses,
        loading,
        selectedBus,
        setSelectedBus,
        selectedSeats,
        setSelectedSeats,
        passengerDetails,
        setPassengerDetails,
        bookingData,
        darkMode,
        toggleDarkMode,
        searchBuses,
        getSeatMap,
        createTempBooking,
        processPayment,
        confirmBooking,
        calculateTotalFare,
        resetBookingData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
