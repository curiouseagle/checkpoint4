import axios from "axios";
import React, { useEffect, useState } from "react";
import Book from "./Book";

function BooksList({ searchValue }) {
  const [bookData, setBookData] = useState([]);
  const startIndex = 0;
  const maxResults = 40;

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/books?q=${searchValue}&printType=books&start=${startIndex}&max=${maxResults}`
      )
      .then((response) => setBookData(response.data.items));
  }, [searchValue]);

  return (
    <div className="w-full p-4 mx-auto grid gap-6 lg:grid-cols-4 grid-cols-1 md:grid-cols-2">
      {bookData.map((book) => {
        const info = book.volumeInfo;
        const thumbnail = info.imageLinks && info.imageLinks.thumbnail;
        if (thumbnail !== undefined) {
          return <Book info={info} bookId={book.id} key={book.id} />;
        }
      })}
    </div>
  );
}

export default BooksList;
