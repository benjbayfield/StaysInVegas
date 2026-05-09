import AccommodationCard from './AccommodationCard';

export default function AccommodationList({ results, onSelect }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-lg font-medium">No properties match your search</p>
        <p className="text-sm mt-1 text-slate-400">Try adjusting your guests count or traveller type.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-4">
        {results.length} {results.length === 1 ? 'property' : 'properties'} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((hotel) => (
          <AccommodationCard key={hotel.id} hotel={hotel} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
