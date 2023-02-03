import React, { useState, useContext } from "react";
import axios from "axios";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import ModalDetailsBook from "./ModalDetailsBook";
import { AuthContext } from "../../context/AuthContext";

function Book({ info, bookId }) {
  const { title, description, imageLinks, authors, categories } = info;
  const [add, setAdd] = useState(false);
  const infoBook = {
    originalId: bookId,
    title: `${title || ""}`,
    author: `${authors ? authors.toString() : ""}`,
    descriptionBook: `${description || ""}`,
    categories: `${categories ? categories.toString() : ""}`,
    cover: `${imageLinks ? imageLinks.thumbnail : ""}`,
  };
  const { currentUserData } = useContext(AuthContext);
  const { id } = currentUserData;

  const handleClickAddWishList = () => {
    setAdd(true);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/${id}/books`, {
      id,
      infoBook,
    });
  };

  const [openModalDetailsBook, setOpenModalDetailsBook] = useState(false);

  const handleClickOpenDetails = () => {
    setOpenModalDetailsBook(true);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg drop-shadow-lg text-sm relative flex flex-col hover:bg-gray-300">
      <ModalDetailsBook
        openModalDetailsBook={openModalDetailsBook}
        setOpenModalDetailsBook={setOpenModalDetailsBook}
        info={info}
      />
      <button type="button" onClick={handleClickAddWishList}>
        <BookOpenIcon
          fill={`${add ? "#ff0000" : "none"}`}
          className="h-5 w-auto absolute top-2 right-2 z-10"
        />
      </button>
      <button type="button" className="" onClick={handleClickOpenDetails}>
        <div className="w-full flex justify-center mb-3 h-40">
          {imageLinks && (
            <img
              src={imageLinks.thumbnail}
              alt=""
              className="object-cover drop-shadow-xl"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium leading-none">{title}</div>
          <div>
            {authors &&
              authors.map((author, index) => {
                return (
                  <p key={index} className="leading-1 text-xs">
                    {author}
                  </p>
                );
              })}
          </div>
        </div>
      </button>
    </div>
  );
}

export default Book;
