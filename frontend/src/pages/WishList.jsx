import React, { useState } from "react";
import SearchBarWish from "../components/BooksWishListPage/SearchBarWish";
import BooksListWish from "../components/BooksWishListPage/BooksListWish";

function WishList() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-2/3 mx-auto flex flex-col gap-4 my-12">
      <SearchBarWish
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <BooksListWish searchValue={searchValue} />
    </div>
  );
}

export default WishList;
