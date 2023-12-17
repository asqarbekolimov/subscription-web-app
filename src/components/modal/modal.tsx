import { useInfoStore } from "@/store";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaPause, FaPlay, FaTimes } from "react-icons/fa";
import { Element } from "@/interfaces/app.interface";
import ReactPlayer from "react-player";
import { BiPlus, BiSolidVolumeMute } from "react-icons/bi";
import { BsVolumeDown } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";

export default function Modal() {
  const { modal, setModal, currentMovie } = useInfoStore();
  const [trailer, setTrailer] = useState<string>("");
  const [muted, setMuted] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(true);

  const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

  const api = `${base_url}/${
    currentMovie?.media_type === "tv" ? "tv" : "movie"
  }/${currentMovie.id}/videos?api_key=${api_key}&language=en-Us`;

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then((res) => res.json());

      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer",
        );
        setTrailer(data.results[index]?.key);
      }
    };
    fetchVideoData();
  }, [currentMovie]);

  function closeModal() {
    setModal(false);
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-slate-500">
            <div className="flex min-h-full flex-col items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[90vh] w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={() => setModal(false)}
                    className="modalButton absolute right-2 top-2 !z-40 h-9 w-9 bg-[#181818]"
                  >
                    <FaTimes />
                  </button>
                  <div>
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${trailer}`}
                      width={"100%"}
                      height={"100%"}
                      playing={playing}
                      style={{ position: "absolute", top: 0, left: 0 }}
                      muted={muted}
                    />
                    <div className="px-18 absolute bottom-10 flex w-full items-center justify-between">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setPlaying((prev) => !prev)}
                          className="flex items-center gap-x-2 rounded-md bg-white px-4 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                        >
                          {playing ? (
                            <>
                              <FaPause className="h-7 w-7 text-black" />
                              Pause
                            </>
                          ) : (
                            <>
                              <FaPlay className="h-7 w-7 text-black" />
                              Play
                            </>
                          )}
                        </button>
                        <button className="modalButton">
                          <BiPlus />
                        </button>

                        <button className="modalButton">
                          <AiOutlineLike className="h-7 w-7" />
                        </button>

                        <button
                          className="modalButton"
                          onClick={() => setMuted((prev) => !prev)}
                        >
                          {muted ? (
                            <BiSolidVolumeMute className="h-7 w-7" />
                          ) : (
                            <BsVolumeDown className="h-7 w-7" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="z-[80]  flex space-x-16 overflow-y-auto rounded-b-md bg-[#181818] px-10 py-8">
                <div className="space-y-6 text-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <p className="font-semibold text-green-400">
                      {currentMovie!.vote_average * 10}% Match
                    </p>
                    <p className="font-light">{currentMovie?.release_date}</p>
                    <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                      HD
                    </div>
                  </div>

                  <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                    <p className="w-5/6">{currentMovie?.overview}</p>
                    <div className="flex flex-col space-y-3 text-sm">
                      <div>
                        <span className="text-[gray]">Original language:</span>{" "}
                        {currentMovie?.original_language}
                      </div>

                      <div>
                        <span className="text-[gray]">Total votes:</span>{" "}
                        {currentMovie?.vote_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
