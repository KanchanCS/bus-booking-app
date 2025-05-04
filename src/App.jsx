import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/navbar/navbar'
import Home from './pages/home/home'
import Footer from './component/Footer/footer'
import BusList from './pages/buslist/BusList'
import SeatSelection from './pages/seatSelection/SeatSelection'
import PassengerDetails from './pages/passengerDetails/PassengerDetails'
import BookingConfirmation from './pages/bookingConfirmation/BookingConfirmation'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/seat-selection/:busId" element={<SeatSelection />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
