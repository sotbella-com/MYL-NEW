import React, { useState, useEffect } from "react";
import ProductGridWithCards from "../Listing/Components/ProductGridWithCards";
import Loader from "../Listing/Components/Loader";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    if (!query.trim()) return;
    setFetchError(null);
    setIsLoading(true);
    setShowResults(true);

    try {
      const response = await fetch(`${baseURL}/v1/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: query }),
      });

      if (!response.ok) throw new Error("Failed to fetch search results");

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      setFetchError("Failed to fetch search results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch product suggestions (auto-prediction)
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/v1/product-suggestions?query=${query}`
      );
      if (!response.ok) return;

      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // ✅ Auto-search when user types 3 or more characters (Debounced)
  useEffect(() => {
    if (searchQuery.length >= 3) {
      const timeoutId = setTimeout(() => {
        fetchSearchResults(searchQuery);
        fetchSuggestions(searchQuery);
      }, 300); // 300ms debounce time

      return () => clearTimeout(timeoutId);
    } else {
      setProducts([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Handle Enter key press in the input field
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchSearchResults(searchQuery);
    }
  };

  return (
    <div id="export-area" className="flex flex-col bg-white my-16 font-jakarta">
      {/* Search Bar */}
      <div className="flex justify-center mt-6 px-4 relative">
        <div
          className="flex items-center border border-gray-300 p-4 bg-white w-full max-w-6xl"
          onClick={() => fetchSearchResults(searchQuery)}
        >
          <span
            onClick={() => fetchSearchResults(searchQuery)}
            className="mr-2 md:mr-4"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.9941 13.9941C14.3195 13.6687 14.8471 13.6687 15.1726 13.9941L18.9226 17.7441C19.248 18.0695 19.248 18.5972 18.9226 18.9226C18.5971 19.248 18.0695 19.248 17.7441 18.9226L13.9941 15.1726C13.6686 14.8472 13.6686 14.3195 13.9941 13.9941Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.832031 9.16668C0.832031 4.5643 4.56299 0.833344 9.16536 0.833344C13.7677 0.833344 17.4987 4.5643 17.4987 9.16668C17.4987 13.769 13.7677 17.5 9.16536 17.5C4.56299 17.5 0.832031 13.769 0.832031 9.16668ZM9.16536 2.50001C5.48346 2.50001 2.4987 5.48478 2.4987 9.16668C2.4987 12.8486 5.48346 15.8333 9.16536 15.8333C12.8473 15.8333 15.832 12.8486 15.832 9.16668C15.832 5.48478 12.8473 2.50001 9.16536 2.50001Z"
                fill="black"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none text-sm lg:text-lg w-full placeholder:text-black"
          />
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full max-w-xl bg-white border border-gray-300 shadow-md rounded-md mt-1 z-10">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm lg:text-base"
                onClick={() => {
                  setSearchQuery(item);
                  fetchSearchResults(item);
                  setSuggestions([]);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Search Results */}
      {showResults && (
        <main className="flex flex-col items-start px-10 w-full max-md:px-5 max-md:max-w-full mt-4">
          {/* Products Section */}
          <section className="relative h-auto w-full min-h-[300px] flex flex-col items-center justify-start mt-4">
            {isLoading ? (
              <Loader />
            ) : fetchError ? (
              <div className="text-center text-red-500 mb-4">{fetchError}</div>
            ) : products.length ? (
              <ProductGridWithCards products={products} />
            ) : (
              <div className="w-full flex justify-center mt-10">
                <p className="text-gray-500 text-lg font-medium">
                  No products found. Try a different search.
                </p>
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
};

export default SearchProducts;
