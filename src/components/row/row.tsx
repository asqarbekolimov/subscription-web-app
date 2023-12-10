import React, { useRef, useState } from "react";
import { RowProps } from "./row.props";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import Thumbnail from "../thumbnail/thumbnail";

const Row = ({ movies, title }: RowProps) => {
  const [moved, setMoved] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: "left" | "right") => {
    setMoved(true);

    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      if (direction === "left" && scrollTo === 0) {
        setMoved(false);
      }
    }
  };
  return (
    <div className="h-[600px] space-y-1 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      {/* Carouusel */}
      <div className="group relative md:ml-2">
        <AiFillCaretLeft
          onClick={() => handleClick("left")}
          className={`absolute bottom-0 left-2 top-0 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 transition duration-200 hover:scale-125 group-hover:opacity-100 ${
            !moved && "hidden"
          }`}
        />
        <div
          ref={carouselRef}
          className="scrollbar-hide flex items-center space-x-1 overflow-hidden overflow-x-scroll md:space-x-4"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <AiFillCaretRight
          className="absolute bottom-0 right-2 top-0 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 transition duration-200 hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
