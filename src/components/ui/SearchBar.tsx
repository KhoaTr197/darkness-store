import React, { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
  spellCheck?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  showClearButton?: boolean;
}

const SearchBar = ({
  placeholder = "Search",
  className = "",
  onSearch,
  initialValue = "",
  spellCheck = false,
  autoFocus = false,
  autoComplete = "on",
  showClearButton = true,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={`flex h-full w-full text-black relative ${className}`}>
      <input
        className="w-full px-4 py-2 rounded-lg placeholder:select-none placeholder:text-[#91919c] focus:outline-hidden focus:outline-(--primary-500) focus:outline-2 focus:outline-offset-0"
        type="search"
        id="searchbar"
        name="SearchBar"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
      />
      {showClearButton && searchQuery && (
        <button
          onClick={clearSearch}
          className="absolute size-8 my-auto inset-y-0 right-0 mr-14 flex items-center rounded-full bg-gray-300"
          type="button"
          aria-label="Clear search"
        >
          <FaXmark className="w-full text-gray-500" />
        </button>
      )}
      <button className="absolute my-auto inset-y-0 right-0 px-3 border-l border-l-gray-300">
        <FaSearch className="size-6 text-gray-400" />
      </button>
    </div>
  );
};

export default SearchBar;
