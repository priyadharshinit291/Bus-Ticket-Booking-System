export const cities = [
  'Chennai', 'Bengaluru', 'Coimbatore', 'Madurai', 'Trichy',
  'Hyderabad', 'Mumbai', 'Pune', 'Goa', 'Kochi',
];

export const popularRoutes = [
  { from: 'Chennai', to: 'Bengaluru' },
  { from: 'Bengaluru', to: 'Goa' },
  { from: 'Coimbatore', to: 'Chennai' },
  { from: 'Hyderabad', to: 'Pune' },
  { from: 'Madurai', to: 'Trichy' },
  { from: 'Mumbai', to: 'Goa' },
];

const operators = [
  { name: 'Skyline Voyager', rating: 4.5 },
  { name: 'Highway Comet', rating: 4.2 },
  { name: 'Southern Cruiser', rating: 4.7 },
  { name: 'Metro Express Lines', rating: 3.9 },
  { name: 'Orbit Travels', rating: 4.4 },
  { name: 'Coastal Route Co.', rating: 4.1 },
];

const busTypes = [
  'AC Sleeper (2+1)',
  'Non-AC Seater (2+3)',
  'AC Seater / Sleeper',
  'Volvo Multi-Axle AC',
  'Non-AC Sleeper (2+1)',
];

function randomBetween(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

function addHours(hour, minute, durationHrs) {
  const total = hour * 60 + minute + durationHrs * 60;
  const h = Math.floor((total / 60) % 24);
  const m = total % 60;
  return `${pad(h)}:${pad(m)}`;
}

export function generateBuses(from, to, date) {
  const seedBase = (from + to + date).length;
  const count = 6 + (seedBase % 4);
  const results = [];
  for (let i = 0; i < count; i++) {
    const op = operators[i % operators.length];
    const type = busTypes[i % busTypes.length];
    const startHour = (i * 3 + 5) % 24;
    const startMin = i % 2 === 0 ? 0 : 30;
    const durationHrs = randomBetween(6, 12);
    const arrival = addHours(startHour, startMin, durationHrs);
    const price = randomBetween(499, 1899);
    const seatsLeft = randomBetween(2, 40);
    results.push({
      id: `${from}-${to}-${i}`.toLowerCase().replace(/\s/g, ''),
      operator: op.name,
      rating: op.rating,
      type,
      from,
      to,
      date,
      departure: `${pad(startHour)}:${pad(startMin)}`,
      arrival,
      duration: `${durationHrs}h ${i % 2 === 0 ? '00' : '30'}m`,
      price,
      seatsLeft,
      amenities: pickAmenities(i),
    });
  }
  return results;
}

function pickAmenities(i) {
  const all = ['wifi', 'charging', 'water', 'blanket', 'tv'];
  return all.filter((_, idx) => (i + idx) % 2 === 0);
}

export function generateSeatMap(seatsLeft) {
  const totalSeats = 40;
  const bookedCount = totalSeats - seatsLeft;
  const bookedSet = new Set();
  while (bookedSet.size < bookedCount) {
    bookedSet.add(randomBetween(1, totalSeats));
  }
  const femaleSet = new Set();
  while (femaleSet.size < Math.floor(totalSeats * 0.1)) {
    const s = randomBetween(1, totalSeats);
    if (!bookedSet.has(s)) femaleSet.add(s);
  }
  const seats = [];
  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      number: `S${i}`,
      status: bookedSet.has(i) ? 'booked' : femaleSet.has(i) ? 'female' : 'available',
    });
  }
  return seats;
}

export const boardingPoints = [
  { name: 'Koyambedu Bus Terminus', time: '21:00' },
  { name: 'Guindy Railway Station', time: '21:25' },
  { name: 'Tambaram Bypass', time: '21:50' },
];

export const droppingPoints = [
  { name: 'Madiwala Bus Stand', time: '05:30' },
  { name: 'Silk Board Junction', time: '05:45' },
  { name: 'Electronic City', time: '06:10' },
];
