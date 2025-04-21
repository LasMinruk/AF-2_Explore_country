import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import { useFavorites } from "../contexts/FavoritesContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart, FaSearch, FaGlobe } from "react-icons/fa";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  

  const { favorites } = useFavorites();

  useEffect(() => {
    const toggleFromHeader = () => setShowFavoritesOnly((prev) => !prev);
    window.addEventListener("favorites-toggle", toggleFromHeader);
    return () => window.removeEventListener("favorites-toggle", toggleFromHeader);
  }, []);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = countries;

    if (searchTerm) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (region) {
      result = result.filter((c) => c.region === region);
    }

    if (showFavoritesOnly) {
      result = result.filter((c) =>
        favorites.some((fav) => fav.cca3 === c.cca3)
      );
    }

    setFiltered(result);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [searchTerm, region, showFavoritesOnly, countries, favorites]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 max-w-7xl mx-auto"
    >
      {/* Controls */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between mb-10">
        {/* Search */}
        <div className="relative w-full md:w-[45%]">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by country name..."
            className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Region */}
        <div className="relative w-full md:w-[25%]">
          <FaGlobe className="absolute left-3 top-3 text-gray-400" />
          <select
            className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Africa"> Africa</option>
            <option value="Americas"> Americas</option>
            <option value="Asia"> Asia</option>
            <option value="Europe"> Europe</option>
            <option value="Oceania"> Oceania</option>
          </select>
        </div>

        {/* Favorites Toggle */}
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`w-full md:w-[25%] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium border transition text-sm shadow-sm ${
            showFavoritesOnly
              ? "bg-pink-100 text-pink-700 border-pink-400"
              : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
          }`}
        >
          <FaHeart className={showFavoritesOnly ? "text-pink-500" : "text-gray-400"} />
          {showFavoritesOnly ? "Showing Favorites" : "Show Favorites Only"}
        </button>
      </div>

      {/* Country Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading countries...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.length > 0 ? (
              paginated.map((country) => (
                <motion.div
                  key={country.cca3}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <CountryCard country={country} />
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-full">
                <p className="text-lg">😔 No countries found</p>
                <p className="text-sm mt-1">Try clearing your filters or search again.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300 disabled:opacity-50"
              >
                ← Prev
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300 disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Home;
