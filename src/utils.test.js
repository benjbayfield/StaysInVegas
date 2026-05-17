import { describe, it, expect } from 'vitest';
import { getNights, formatDate, filterHotels } from './utils';

describe('getNights', () => {
  it('returns null when dateRange is null', () => {
    expect(getNights(null)).toBeNull();
  });

  it('returns null when from is missing', () => {
    expect(getNights({ to: new Date() })).toBeNull();
  });

  it('returns null when to is missing', () => {
    expect(getNights({ from: new Date() })).toBeNull();
  });

  it('returns null when dates match', () => {
    expect(getNights({ from: new Date('2026-12-01'), to: new Date('2026-12-01') })).toBeNull;
  });

  it('returns null when dates are wrong way around', () => {
    expect(getNights({ from: new Date('2026-12-02'), to: new Date('2026-12-01') })).toBeNull;
  });

  it('calculates 1 night', () => {
    expect(getNights({ from: new Date('2026-12-01'), to: new Date('2026-12-02') })).toBe(1);
  });

  it('calculates 6 nights', () => {
    expect(getNights({ from: new Date('2026-12-01'), to: new Date('2026-12-07') })).toBe(6);
  });
});

describe('formatDate', () => {
  it('returns empty string for null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('formats with long month by default', () => {
    expect(formatDate(new Date('2026-09-15'))).toBe('15 September 2026');
  });

  it('formats with short month when specified', () => {
    expect(formatDate(new Date('2026-09-15'), 'short')).toBe('15 Sept 2026');
  });
});

describe('filterHotels', () => {
  const hotels = [
    { id: 1, suitableFor: ['business', 'adult-leisure'], maxGuests: 2 },
    { id: 2, suitableFor: ['family'], maxGuests: 6 },
    { id: 3, suitableFor: ['business', 'family'], maxGuests: 4 },
  ];

  it('returns all hotels when travellerType is empty and guests is 1', () => {
    expect(filterHotels(hotels, { travellerType: '', guests: 1 })).toHaveLength(3);
  });

  it('filters by traveller type', () => {
    const ids = filterHotels(hotels, { travellerType: 'family', guests: 1 }).map((h) => h.id);
    expect(ids).toEqual([2, 3]);
  });

  it('filters by guest count', () => {
    const ids = filterHotels(hotels, { travellerType: '', guests: 5 }).map((h) => h.id);
    expect(ids).toEqual([2]);
  });

  it('filters by both traveller type and guest count', () => {
    const ids = filterHotels(hotels, { travellerType: 'family', guests: 5 }).map((h) => h.id);
    expect(ids).toEqual([2]);
  });

  it('returns empty array when nothing matches', () => {
    expect(filterHotels(hotels, { travellerType: 'business', guests: 10 })).toHaveLength(0);
  });

  it('returns empty array for empty hotel list', () => {
    expect(filterHotels([], { travellerType: 'business', guests: 2 })).toHaveLength(0);
  });
});
