import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import axios from 'axios';
import '@testing-library/jest-dom';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { BrowserRouter } from 'react-router-dom'; // ✅ add this

jest.mock('axios');

const mockCountries = [
  {
    name: { common: 'France' },
    population: 67000000,
    region: 'Europe',
    capital: ['Paris'],
    flags: { svg: 'https://flagcdn.com/fr.svg' },
    languages: { fra: 'French' },
    cca3: 'FRA'
  },
  {
    name: { common: 'Brazil' },
    population: 210000000,
    region: 'Americas',
    capital: ['Brasília'],
    flags: { svg: 'https://flagcdn.com/br.svg' },
    languages: { por: 'Portuguese' },
    cca3: 'BRA'
  }
];

test('renders filtered countries', async () => {
  axios.get.mockResolvedValueOnce({ data: mockCountries });

  render(
    <BrowserRouter> {/* ✅ wrap everything here */}
      <FavoritesProvider>
        <Home />
      </FavoritesProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/France/i)).toBeInTheDocument();
    expect(screen.getByText(/Brazil/i)).toBeInTheDocument();
  });
});
