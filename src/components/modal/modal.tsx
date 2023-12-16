import { useInfoStore } from "@/store";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal() {
  const { modal, setModal, currentMovie } = useInfoStore();

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  return (
    <>
      {/* <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 hover:bg-black/30"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={() => setModal(false)}
                    className="modalButton absolute right-2 top-2 !z-40 h-9 w-9 bg-[#181818]"
                  >
                    <FaTimes />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {currentMovie.title ||
                      currentMovie.name ||
                      currentMovie.original_name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500"></p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
