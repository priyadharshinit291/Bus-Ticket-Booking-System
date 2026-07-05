import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import SeatSelection from './pages/SeatSelection';
import PassengerDetails from './pages/PassengerDetails';
import Confirmation from './pages/Confirmation';
import MyTickets from './pages/MyTickets';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';

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
