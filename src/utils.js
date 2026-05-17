export function getNights(dateRange) {
  if (!dateRange?.from || !dateRange?.to) return null;
  if (dateRange.from >= dateRange.to) return null;
  return Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24));
}

export function formatDate(date, monthFormat = 'long') {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: monthFormat, year: 'numeric' });
}

export function filterHotels(hotels, params) {
  return hotels.filter((hotel) => {
    if (params.travellerType && !hotel.suitableFor.includes(params.travellerType)) return false;
    if (hotel.maxGuests < params.guests) return false;
    return true;
  });
}
