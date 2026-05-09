import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';

const TRAVELLER_TYPES = [
  { value: '', label: 'Any type' },
  { value: 'business', label: 'Business' },
  { value: 'adult-leisure', label: 'Adult Leisure' },
  { value: 'family', label: 'Family' },
];

function Stepper({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className="flex items-center border border-slate-200 rounded-lg bg-white h-10 px-3 gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-30 text-lg leading-none"
      >
        −
      </button>
      <span className="text-sm text-slate-700 w-4 text-center select-none">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-30 text-lg leading-none"
      >
        +
      </button>
    </div>
  );
}

const formatDate = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function SearchPanel({ onSearch, compact = false }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState(undefined);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [travellerType, setTravellerType] = useState('');
  const calendarRef = useRef(null);

  useEffect(() => {
    if (!showCalendar) return;
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  const dateLabel = dateRange?.from
    ? `${formatDate(dateRange.from)}${dateRange.to ? ` — ${formatDate(dateRange.to)}` : ' — Select check-out'}`
    : 'Select check-in and check-out';

  const handleDateSelect = (range) => {
    setDateRange(range);
    if (range?.from && range?.to) setShowCalendar(false);
  };

  const handleSearch = () => {
    onSearch({ dateRange, guests, rooms, travellerType });
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${compact ? 'p-4' : 'p-6'}`}>
      {!compact && (
        <h2 className="text-base font-semibold text-slate-800 mb-4">Search accommodation</h2>
      )}
      <div className="flex flex-col lg:flex-row gap-3 items-end">

        {/* Date range */}
        <div className="relative flex-1 min-w-0" ref={calendarRef}>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Dates</label>
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full text-left px-3 h-10 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 truncate"
            style={{ color: dateRange?.from ? '#1e293b' : '#94a3b8' }}
          >
            {dateLabel}
          </button>
          {showCalendar && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                disabled={{ before: new Date() }}
                numberOfMonths={2}
              />
            </div>
          )}
        </div>

        {/* Guests */}
        <div className="flex flex-col">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Guests</label>
          <Stepper value={guests} onChange={setGuests} min={1} max={10} />
        </div>

        {/* Rooms */}
        <div className="flex flex-col">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Rooms</label>
          <Stepper value={rooms} onChange={setRooms} min={1} max={5} />
        </div>

        {/* Traveller type */}
        <div className="flex flex-col">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Type of traveller</label>
          <select
            value={travellerType}
            onChange={(e) => setTravellerType(e.target.value)}
            className="h-10 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300"
          >
            {TRAVELLER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="h-10 px-6 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0"
        >
          Search
        </button>
      </div>
    </div>
  );
}
