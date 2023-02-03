import { BookOpenIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import BookWish from "./BookWish";

function BooksListWish({ searchValue }) {
  const [bookData, setBookData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const { currentUserData } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${currentUserData.id}/books`
      )
      .then((response) => setBookData(response.data));
  }, [fetchTrigger]);

  return (
    <div>
      {bookData.length > 0 ? (
        <div className="w-full p-4 mx-auto grid gap-6 lg:grid-cols-4 grid-cols-1 md:grid-cols-2">
          {bookData
            .filter(
              (book) =>
                book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                book.descriptionBook
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                book.author.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((book, index) => {
              return (
                <BookWish
                  book={book}
                  key={index}
                  setFetchTrigger={setFetchTrigger}
                />
              );
            })}
        </div>
      ) : (
        <div className="w-full p-10 bg-gray-200 w-full rounded-lg shadow-lg mt-4">
          {" "}
          Vous n'avez aucun livre dans votre liste d'envie. Pour en ajouter,
          cliquer sur l'icone{" "}
          <span>
            <BookOpenIcon className="h-5 w-auto inline-block" />
          </span>{" "}
          d'un livre dans la section Books.
        </div>
      )}
    </div>
  );
}

export default BooksListWish;
