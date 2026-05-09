export default function AccommodationCard({ hotel, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(hotel)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(hotel)}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white rounded-lg px-2.5 py-1 text-sm font-bold text-slate-900 shadow-md">
          £{hotel.pricePerNight.toLocaleString()}
          <span className="text-xs font-normal text-slate-500"> /night</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-slate-900 leading-snug">{hotel.name}</h3>
          <div className="flex items-center gap-1 shrink-0 text-sm">
            <span className="text-amber-400">★</span>
            <span className="font-medium text-slate-700">{hotel.rating}</span>
            <span className="text-slate-400">({hotel.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-2">{hotel.location}</p>
        <p className="text-sm text-slate-600 line-clamp-2">{hotel.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 4).map((a) => (
            <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="text-xs text-slate-400 self-center">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
