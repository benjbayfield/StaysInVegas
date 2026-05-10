import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccommodationList from './AccommodationList';

const makeHotel = (id) => ({
  id,
  name: `Hotel ${id}`,
  location: 'The Strip',
  tagline: 'A great Las Vegas stay',
  image: `https://picsum.photos/seed/${id}/800/500`,
  pricePerNight: 200,
  rating: 4.5,
  reviewCount: 100,
  amenities: ['Pool', 'Spa'],
});

describe('AccommodationList', () => {
  it('shows the empty state when results is empty', () => {
    render(<AccommodationList results={[]} onSelect={vi.fn()} />);
    expect(screen.getByText('No properties match your search')).toBeInTheDocument();
  });

  it('shows a helpful hint in the empty state', () => {
    render(<AccommodationList results={[]} onSelect={vi.fn()} />);
    expect(screen.getByText(/Try adjusting/)).toBeInTheDocument();
  });

  it('shows singular "property" for 1 result', () => {
    render(<AccommodationList results={[makeHotel(1)]} onSelect={vi.fn()} />);
    expect(screen.getByText('1 property found')).toBeInTheDocument();
  });

  it('shows plural "properties" for multiple results', () => {
    render(<AccommodationList results={[makeHotel(1), makeHotel(2), makeHotel(3)]} onSelect={vi.fn()} />);
    expect(screen.getByText('3 properties found')).toBeInTheDocument();
  });

  it('renders a card for each result', () => {
    render(<AccommodationList results={[makeHotel(1), makeHotel(2)]} onSelect={vi.fn()} />);
    expect(screen.getByText('Hotel 1')).toBeInTheDocument();
    expect(screen.getByText('Hotel 2')).toBeInTheDocument();
  });
});
