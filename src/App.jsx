import { useState } from 'react';
import hotels from './data/hotels.json';
import { filterHotels } from './utils';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import AccommodationList from './components/AccommodationList';
import AccommodationDetail from './components/AccommodationDetail';

export default function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    const results = filterHotels(hotels, params);
    setSearchParams(params);
    setSearchResults(results);
    setSelectedHotel(null);
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedHotel(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {!selectedHotel && (
          <SearchPanel
            onSearch={handleSearch}
            compact={searchResults !== null}
          />
        )}

        {selectedHotel ? (
          <AccommodationDetail
            hotel={selectedHotel}
            searchParams={searchParams}
            onBack={handleBack}
          />
        ) : searchResults !== null ? (
          <AccommodationList
            results={searchResults}
            onSelect={handleSelectHotel}
          />
        ) : (
          <div className="text-center py-24 text-slate-400">
            <p className="text-lg">Search above to find Las Vegas accommodation</p>
          </div>
        )}
      </main>
    </div>
  );
}
