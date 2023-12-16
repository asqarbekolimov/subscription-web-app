import React, { useEffect, useState } from "react";
import { HeroProps } from "./hero.props";
import { IMovie } from "@/interfaces/app.interface";
import ReactStars from "react-stars";
import Image from "next/image";
import { image_base } from "../constants";
import { TbPlayerPlay } from "react-icons/tb";
import { useInfoStore } from "@/store";

const Hero = ({ trending }: HeroProps) => {
  const { setModal, setCurrentMovie } = useInfoStore();
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)];
    setMovie(randomMovie);
  }, [trending]);

  const handleCurrentMovie = () => {
    setModal(true);
    setCurrentMovie(movie);
  };

  return (
    <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:justify-center lg:pb-12">
      <div className="-x absolute left-0 top-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-block w-[111px] rounded-bl-[8px] rounded-tr-[8px] bg-slate-900/80 px-[8px] py-[4px] text-center text-cyan-500">
          {movie.media_type}
        </div>
        <div
          className={`rounded-full py-1 text-center text-2xl ${
            movie?.adult ? "text-green-600" : "text-red-600"
          }`}
        >
          {movie.adult ? "+16" : "+18"}
        </div>
      </div>

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

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie.title || movie.name || movie.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview?.slice(0, 100)}...
      </p>
      <div>
        <button
          onClick={handleCurrentMovie}
          className="flex h-[56px] w-[200px] items-center justify-center space-x-2 rounded-full bg-white/60 px-8 py-4 font-bold text-black transition-all hover:bg-white/80"
        >
          Watch Now
          <TbPlayerPlay className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
