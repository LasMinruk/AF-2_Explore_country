import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../contexts/FavoritesContext';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock localStorage
beforeAll(() => {
  const mockStorage = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value.toString(); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; }
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
  });
});

const sampleCountry = {
  cca3: 'FRA',
  name: { common: 'France' }
};

const TestComponent = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div>
      <button onClick={() => toggleFavorite(sampleCountry)}>Toggle</button>
      <div data-testid="fav-count">{favorites.length}</div>
      <div data-testid="is-fav">{isFavorite('FRA') ? 'Yes' : 'No'}</div>
    </div>
  );
};

test('toggles favorite country', async () => {
  render(
    <FavoritesProvider>
      <TestComponent />
    </FavoritesProvider>
  );

  const count = screen.getByTestId('fav-count');
  const status = screen.getByTestId('is-fav');

  // Initially not favorited
  expect(count.textContent).toBe('0');
  expect(status.textContent).toBe('No');

  // Add to favorites
  userEvent.click(screen.getByText('Toggle'));
  await waitFor(() => {
    expect(count.textContent).toBe('1');
    expect(status.textContent).toBe('Yes');
  });

  // Remove from favorites
  userEvent.click(screen.getByText('Toggle'));
  await waitFor(() => {
    expect(count.textContent).toBe('0');
    expect(status.textContent).toBe('No');
  });
});
