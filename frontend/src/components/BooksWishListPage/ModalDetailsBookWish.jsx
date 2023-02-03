/* eslint-disable react/prop-types */
import React, { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function ModalDetailsBookWish({
  openModalDetailsBookWish,
  setOpenModalDetailsBookWish,
  book,
  setFetchTrigger,
}) {
  const cancelButtonRef = useRef(null);
  const { id, originalId, title, descriptionBook, cover, author, categories } =
    book;
  const [updateOpen, setUpdateOpen] = useState(false);
  const [infoBookUpdate, setInfoBookUpdate] = useState({
    title,
    descriptionBook,
  });
  const { currentUserData } = useContext(AuthContext);
  const idUser = currentUserData.id;

  const handleClickUpdate = () => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/book/${id}`, {
      originalId,
      title: infoBookUpdate.title,
      descriptionBook: infoBookUpdate.descriptionBook,
      cover,
      author,
      categories,
    });
    setUpdateOpen(false);
    setOpenModalDetailsBookWish(false);
    setFetchTrigger((prevTrigger) => prevTrigger + 1);
  };

  const idBook = book.id;

  const handleClickDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/user/${idUser}/book`, {
        data: { idBook },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setOpenModalDetailsBookWish(false);
    setFetchTrigger((prevTrigger) => prevTrigger + 1);
  };

  return (
    <Transition.Root show={openModalDetailsBookWish} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpenModalDetailsBookWish}
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
              {!updateOpen ? (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-start">
                    <div className="w-5/6 flex justify-center mb-3 md:ml-12 h-44">
                      {cover !== "" && (
                        <img
                          src={cover}
                          alt=""
                          className="object-cover drop-shadow-xl"
                        />
                      )}
                    </div>
                    <div className="w-fit flex flex-col md:gap-3 gap-2">
                      <button
                        type="button"
                        className=" w-full inline-flex justify-center items-center gap-2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 w-fit sm:text-sm"
                        onClick={() => setUpdateOpen(true)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className=" w-full inline-flex justify-center items-center gap-2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 w-fit sm:text-sm"
                        onClick={handleClickDelete}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="font-medium text-md">{title}</div>
                  <div className="border-l border-gray-400 pl-2">
                    {author &&
                      author.split(",").map((auth, index) => {
                        return (
                          <p key={index} className="leading-1 text-sm">
                            {auth}
                          </p>
                        );
                      })}
                  </div>
                  <div className="mt-1 text-sm">
                    Genre :{" "}
                    {categories &&
                      categories.split(",").map((category, index) => {
                        return (
                          <p
                            key={index}
                            className="leading-1 text-xs py-1 px-2 inline-block rounded-md bg-red-100"
                          >
                            {" "}
                            {category}{" "}
                          </p>
                        );
                      })}
                  </div>
                  <div>{descriptionBook}</div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpenModalDetailsBookWish(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      Retour
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  <div className="w-full flex justify-center mb-3 h-44">
                    {cover !== "" && (
                      <img
                        src={cover}
                        alt=""
                        className="object-cover drop-shadow-xl"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <input
                      value={infoBookUpdate.title}
                      onChange={(e) =>
                        setInfoBookUpdate({
                          ...infoBookUpdate,
                          title: e.target.value,
                        })
                      }
                      type="text"
                      className=" w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-1"
                    />
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
                    <div>
                      {categories &&
                        categories.split(",").map((category, index) => {
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
                    <textarea
                      value={infoBookUpdate.descriptionBook}
                      onChange={(e) =>
                        setInfoBookUpdate({
                          ...infoBookUpdate,
                          descriptionBook: e.target.value,
                        })
                      }
                      type="text"
                      className=" w-full h-48 shadow-sm sm:text-sm border-gray-300 border rounded-md p-1"
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setUpdateOpen(false);
                      }}
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={handleClickUpdate}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Valider
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalDetailsBookWish;
