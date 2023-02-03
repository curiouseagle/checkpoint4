import React, { useState } from "react";
import BooksList from "../components/BooksPage/BooksList";
import SearchBar from "../components/BooksPage/SearchBar";

function Books() {
  const [searchValue, setSearchValue] = useState("astérix");

  return (
    <div className="w-2/3 mx-auto flex flex-col gap-4 my-12">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <BooksList searchValue={searchValue} />
    </div>
  );
}

export default Books;
