import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('renders the site name', () => {
    render(<Header />);
    expect(screen.getByText('Stays in Vegas')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Header />);
    expect(screen.getByText('For What Happens in Vegas')).toBeInTheDocument();
  });

  it('renders as a header landmark', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
