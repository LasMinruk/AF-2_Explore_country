import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { useFavorites } from "../contexts/FavoritesContext";
import "react-tooltip/dist/react-tooltip.css";

const Layout = ({ children }) => {
  const { favorites } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    if (location.pathname !== "/") {
      localStorage.setItem("showFavoritesOnly", "true");
      navigate("/");
    } else {
      window.dispatchEvent(new Event("favorites-toggle"));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 flex flex-col">
      {/* 🌍 Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* 🌍 Logo/Title */}
          <Link to="/" className="flex items-center gap-2 group transition">
            <motion.span
              className="text-3xl sm:text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 leading-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              🌍
            </motion.span>
            <motion.span
              className="text-2xl sm:text-3xl font-extrabold text-gray-800 group-hover:text-blue-600 tracking-wide leading-none"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Country Explorer
            </motion.span>
          </Link>

          {/* 💖 Favorites Button */}
          <motion.button
            onClick={handleFavoritesClick}
            className="relative flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-full text-sm font-medium shadow transition duration-300"
            whileHover={{ scale: 1.05 }}
            data-tooltip-id="favorites-tooltip"
            data-tooltip-content="View your favorite countries 💖"
          >
            💖 Favorites
            {favorites.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-[2px]"
              >
                {favorites.length}
              </motion.span>
            )}
          </motion.button>

          <Tooltip id="favorites-tooltip" place="bottom" className="z-50" />
        </div>
      </header>

      {/* 📄 Main */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* 📜 Footer */}
      <footer className="text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} <strong>Country Explorer</strong>. All rights reserved. Created by{" "}
        <span className="text-blue-500 font-medium">Lasiru Minruk</span>.
      </footer>
    </div>
  );
};

export default Layout;
