import React from "react";
import { ThumbnailProps } from "./thumbnail.props";
import Image from "next/image";
import { image_base } from "../constants";
import ReactStars from "react-stars";
import { useInfoStore } from "@/store";

const Thumbnail = ({ movie, isBig }: ThumbnailProps) => {
  const { setModal, setCurrentMovie } = useInfoStore();

  const handleCurrentMovie = () => {
    setModal(true);
    setCurrentMovie(movie);
  };
  return (
    <div
      onClick={handleCurrentMovie}
      className={`relative ${
        isBig
          ? "h-[400px] min-w-[350px] md:h-[550px] md:min-w-[470px]"
          : "h-[330px] min-w-[200px] md:h-[440px] md:min-w-[292px]"
      }  cursor-pointer transition duration-200 ease-out md:hover:scale-105`}
    >
      <Image
        src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie?.title}
        fill
        className="rounded-sm object-cover md:rounded"
      />

      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40" />

      <div className="absolute bottom-5 left-4 right-2 min-h-[60px]">
        <div className="flex items-center space-x-2">
          <ReactStars
            edit={false}
            count={10}
            value={movie.vote_average}
            color2={"#ffd700"}
            color1={"#ffffff"}
          />
          <p>({movie.vote_count})</p>
        </div>
        <h1 className="text-xl font-bold md:text-2xl">
          {movie.title || movie.name || movie.original_name}
        </h1>
      </div>
    </div>
  );
};

export default Thumbnail;
