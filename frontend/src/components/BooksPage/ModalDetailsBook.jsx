/* eslint-disable react/prop-types */
import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

function ModalDetailsBook({
  openModalDetailsBook,
  setOpenModalDetailsBook,
  info,
}) {
  const cancelButtonRef = useRef(null);
  const { title, description, imageLinks, authors, categories } = info;

  return (
    <Transition.Root show={openModalDetailsBook} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpenModalDetailsBook}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex flex-row items-start">
                <div className="w-5/6 flex justify-center mb-3 md:ml-12 h-44">
                  {imageLinks && (
                    <img
                      src={imageLinks.thumbnail}
                      alt=""
                      className="object-cover drop-shadow-xl"
                    />
                  )}
                </div>
              </div>
              <div className="font-medium text-md">{title}</div>
              <div className="border-l border-gray-400 pl-2">
                {authors &&
                  authors.map((author, index) => {
                    return (
                      <p key={index} className="leading-1 text-sm">
                        {author}
                      </p>
                    );
                  })}
              </div>
              <div className="mt-1 text-sm">
                {" "}
                Genre :
                {categories &&
                  categories.map((category, index) => {
                    return (
                      <p
                        key={index}
                        className="leading-1 text-xs py-1 px-2 inline-block rounded-md bg-red-100"
                      >
                        {category}
                      </p>
                    );
                  })}
              </div>
              <div>{description}</div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpenModalDetailsBook(false)}
                  ref={cancelButtonRef}
                >
                  Retour
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalDetailsBook;
