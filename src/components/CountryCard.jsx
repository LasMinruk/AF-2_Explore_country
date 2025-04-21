import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

const CountryCard = ({ country }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(country.cca3);

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      {/* ❤️ Favorite Button - stays visible and works correctly */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Stop from triggering the link
          toggleFavorite(country);
        }}
        className="absolute top-2 right-2 text-xl z-10 bg-white bg-opacity-90 px-2 py-1 rounded-full"
        title={fav ? "Remove from Favorites" : "Add to Favorites"}
      >
        {fav ? "💖" : "🤍"}
      </button>

      {/* Country Details Link */}
      <Link to={`/country/${country.cca3}`} className="block">
        <img
          src={country.flags?.png}
          alt={country.name?.common}
          className="w-full h-40 object-cover rounded mb-3"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {country.name?.common}
        </h2>
        <p className="text-sm text-gray-700">
          <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Region:</strong> {country.region}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Population:</strong> {country.population?.toLocaleString()}
        </p>
      </Link>
    </div>
  );
};

export default CountryCard;
