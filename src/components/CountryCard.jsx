import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

const CountryCard = ({ country }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(country.cca3);

  return (
    <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(country);
        }}
        title={fav ? "Remove from Favorites" : "Add to Favorites"}
        className="absolute top-3 right-3 text-xl z-10 bg-white rounded-full shadow px-2 py-[2px]"
      >
        {fav ? "💖" : "🤍"}
      </button>

      <Link to={`/country/${country.cca3}`} className="block space-y-3">
        <img
          src={country.flags?.png || country.flags?.svg}
          alt={country.name.common}
          className="w-full h-32 object-contain rounded-md"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{country.name.common}</h2>
          <p className="text-sm text-gray-600"><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
          <p className="text-sm text-gray-600"><strong>Region:</strong> {country.region}</p>
          <p className="text-sm text-gray-600"><strong>Population:</strong> {country.population?.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;
