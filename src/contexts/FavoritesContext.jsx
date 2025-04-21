import React, { createContext, useContext, useEffect, useState } from "react";

// Create Context
const FavoritesContext = createContext();

// Custom Hook to use this context
export const useFavorites = () => useContext(FavoritesContext);

// Provider Component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove favorite
  const toggleFavorite = (country) => {
    const isFav = favorites.find((fav) => fav.cca3 === country.cca3);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.cca3 !== country.cca3));
    } else {
      setFavorites([...favorites, country]);
    }
  };

  // Check if a country is favorited
  const isFavorite = (code) => {
    return favorites.some((fav) => fav.cca3 === code);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
