import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import SearchResults from './Pages/SearchResults';
import SeatSelection from './Pages/SeatSelection';
import PassengerDetails from './Pages/PassengerDetails';
import Confirmation from './Pages/Confirmation';
import MyTickets from './Pages/MyTickets';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BookingProvider } from './Context/BookingContext';
import { AuthProvider } from './Context/AuthContext';

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/search" element={<AnimatedPage><SearchResults /></AnimatedPage>} />
        <Route path="/seats" element={<AnimatedPage><SeatSelection /></AnimatedPage>} />
        <Route path="/details" element={<AnimatedPage><PassengerDetails /></AnimatedPage>} />
        <Route path="/confirmation" element={<AnimatedPage><Confirmation /></AnimatedPage>} />
        <Route path="/my-tickets" element={<AnimatedPage><MyTickets /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><Signup /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BookingProvider>
    </AuthProvider>
  );
}
