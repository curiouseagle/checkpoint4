import React, { useState } from "react";
import ModalDetailsBookWish from "./ModalDetailsBookWish";

function BookWish({ book, setFetchTrigger }) {
  const { title, cover, author } = book;
  const [openModalDetailsBookWish, setOpenModalDetailsBookWish] =
    useState(false);

  const handleClickOpenDetails = () => {
    setOpenModalDetailsBookWish(true);
  };
  return (
    <div className="bg-gray-200 w-fit max-w-[205px] mx-auto p-6 rounded-lg drop-shadow-lg text-sm relative flex flex-col">
      <ModalDetailsBookWish
        openModalDetailsBookWish={openModalDetailsBookWish}
        setOpenModalDetailsBookWish={setOpenModalDetailsBookWish}
        book={book}
        setFetchTrigger={setFetchTrigger}
      />
      <button type="button" className="" onClick={handleClickOpenDetails}>
        <div className="w-full flex justify-center mb-3 h-40">
          {cover && (
            <img src={cover} alt="" className="object-cover drop-shadow-xl" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium leading-none mx-auto">{title}</div>
          <div>
            {author &&
              author.split(",").map((auth, index) => {
                return (
                  <p key={index} className="leading-1 text-xs">
                    {auth}
                  </p>
                );
              })}
          </div>
        </div>
      </button>
    </div>
  );
}

export default BookWish;
