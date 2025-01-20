import React from "react";
import SearchIcon from "@/_assets/SearchIcon";

const SearchBar = () => {
  return (
    <div className="flex w-[30rem] h-full text-black">
      <label htmlFor="searchbar" className="w-fit h-fit absolute top-1/2 -translate-y-1/2 ml-2">
        <SearchIcon
          width={24}
          height={24}
          fill="#91919c"
        />
      </label>
      <input
        className="w-full p-2 pl-10 rounded-lg placeholder:select-none placeholder:text-[#91919c] focus:outline-none focus:outline-[#8f00ff] focus:outline-2 focus:outline-offset-0"
        type="search"
        id="searchbar"
        name="SearchBar"
        placeholder="Search"
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default SearchBar;
