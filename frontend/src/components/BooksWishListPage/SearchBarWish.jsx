/* eslint-disable react/prop-types */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

function SearchBarWish({ setSearchValue, searchValue }) {
  return (
    <div>
      <div className="mt-1 relative flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-200 border-2 rounded-md p-2"
          defaultValue={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center px-2 text-sm font-sans font-medium text-gray-400">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </kbd>
        </div>
      </div>
    </div>
  );
}

export default SearchBarWish;
