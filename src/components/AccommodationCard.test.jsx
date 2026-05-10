import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccommodationCard from './AccommodationCard';

const mockHotel = {
  id: 1,
  name: 'The Grand Vegas',
  location: 'The Strip, Las Vegas',
  tagline: 'Experience luxury on the Strip',
  image: 'https://picsum.photos/seed/test/800/500',
  pricePerNight: 299,
  rating: 4.8,
  reviewCount: 1234,
  amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'],
};

describe('AccommodationCard', () => {
  it('renders the hotel name', () => {
    render(<AccommodationCard hotel={mockHotel} onSelect={vi.fn()} />);
    expect(screen.getByText('The Grand Vegas')).toBeInTheDocument();
  });

  it('renders the location', () => {
    render(<AccommodationCard hotel={mockHotel} onSelect={vi.fn()} />);
    expect(screen.getByText('The Strip, Las Vegas')).toBeInTheDocument();
  });

  it('renders the price per night', () => {
    render(<AccommodationCard hotel={mockHotel} onSelect={vi.fn()} />);
    expect(screen.getByText('£299')).toBeInTheDocument();
  });

  it('renders the rating', () => {
    render(<AccommodationCard hotel={mockHotel} onSelect={vi.fn()} />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('renders the review count', () => {
    render(<AccommodationCard hotel={mockHotel} onSelect={vi.fn()} />);
    expect(screen.getByText('(1,234)')).toBeInTheDocument();
  });

  it('shows first 4 amenities only', () => {
    render(<AccommodationCard hotel={mockHotel} onSelect={vi.fn()} />);
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
    expect(screen.queryByText('Bar')).not.toBeInTheDocument();
  });

  it('shows overflow count when more than 4 amenities', () => {
    render(<AccommodationCard hotel={mockHotel} onSelect={vi.fn()} />);
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('does not show overflow count when 4 or fewer amenities', () => {
    const hotel = { ...mockHotel, amenities: ['Pool', 'Spa', 'Gym'] };
    render(<AccommodationCard hotel={hotel} onSelect={vi.fn()} />);
    expect(screen.queryByText(/more/)).not.toBeInTheDocument();
  });

  it('calls onSelect with the hotel when clicked', () => {
    const onSelect = vi.fn();
    render(<AccommodationCard hotel={mockHotel} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(mockHotel);
  });

  it('calls onSelect when Enter is pressed', () => {
    const onSelect = vi.fn();
    render(<AccommodationCard hotel={mockHotel} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(mockHotel);
  });

  it('does not call onSelect for other keys', () => {
    const onSelect = vi.fn();
    render(<AccommodationCard hotel={mockHotel} onSelect={onSelect} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onSelect).not.toHaveBeenCalled();
  });
});
