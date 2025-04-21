import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import '@testing-library/jest-dom'; // 👈 REQUIRED

test('renders country card with data', () => {
  const country = {
    cca3: 'FRA',
    name: { common: 'France' },
    population: 67000000,
    region: 'Europe',
    capital: ['Paris'],
    flags: { png: 'https://flagcdn.com/fr.png' }
  };

  render(
    <BrowserRouter>
      <FavoritesProvider>
        <CountryCard country={country} />
      </FavoritesProvider>
    </BrowserRouter>
  );

  expect(screen.getByText('France')).toBeInTheDocument();
  expect(screen.getByText(/Europe/)).toBeInTheDocument();
  expect(screen.getByText(/Paris/)).toBeInTheDocument();
});
