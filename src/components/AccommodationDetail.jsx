function getNights(dateRange) {
  if (!dateRange?.from || !dateRange?.to) return null;
  return Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24));
}

function formatDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function AccommodationDetail({ hotel, searchParams, onBack }) {
  const nights = getNights(searchParams?.dateRange);
  const total = nights ? hotel.pricePerNight * nights : null;

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        <span aria-hidden="true">←</span> Back to results
      </button>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Hero image */}
        <div className="overflow-hidden" style={{ aspectRatio: '21/8' }}>
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">{hotel.name}</h2>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-amber-400 text-lg">★</span>
                  <span className="font-semibold text-slate-800">{hotel.rating}</span>
                  <span className="text-sm text-slate-400">({hotel.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-4">{hotel.location}</p>
              <p className="text-slate-700 leading-relaxed mb-6">{hotel.description}</p>

              <h3 className="font-semibold text-slate-900 mb-3">Highlights</h3>
              <ul className="space-y-2 mb-6">
                {hotel.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                    {h}
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-slate-900 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((a) => (
                  <span key={a} className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking sidebar */}
            <div className="lg:w-72 shrink-0">
              <div className="border border-slate-200 rounded-xl p-5 lg:sticky lg:top-6">
                <div className="text-2xl font-bold text-slate-900">
                  £{hotel.pricePerNight.toLocaleString()}
                  <span className="text-base font-normal text-slate-500"> / night</span>
                </div>

                {searchParams?.dateRange?.from && (
                  <div className="mt-3 text-sm text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Check-in</span>
                      <span>{formatDate(searchParams.dateRange.from)}</span>
                    </div>
                    {searchParams.dateRange.to && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Check-out</span>
                        <span>{formatDate(searchParams.dateRange.to)}</span>
                      </div>
                    )}
                    {searchParams.guests > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Guests</span>
                        <span>{searchParams.guests}</span>
                      </div>
                    )}
                  </div>
                )}

                {total !== null && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>£{hotel.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                      <span>£{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-900 pt-2 border-t border-slate-100">
                      <span>Total</span>
                      <span>£{total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reserve now
                </button>
                <p className="text-xs text-slate-400 text-center mt-2">No charge until confirmation</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
