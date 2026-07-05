import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [search, setSearch] = useState({ from: 'Chennai', to: 'Bengaluru', date: '' });
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passenger, setPassenger] = useState({ name: '', age: '', gender: 'Male', phone: '', email: '' });
  const [boarding, setBoarding] = useState(null);
  const [dropping, setDropping] = useState(null);
  const [pnr, setPnr] = useState(null);

  const value = {
    search, setSearch,
    selectedBus, setSelectedBus,
    selectedSeats, setSelectedSeats,
    passenger, setPassenger,
    boarding, setBoarding,
    dropping, setDropping,
    pnr, setPnr,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
