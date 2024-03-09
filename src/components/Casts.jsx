import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMoviesCreditAsync } from "../redux/slice/movieSlices";

export const Casts = () => {
  const creditMovie = useSelector((state) => state.movie.movieCredit);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(fetchMoviesCreditAsync(params.id));
  }, [params.id]);

  const slider = (offSet) => {
    const scrollContainer = document.querySelector('.movieCast');
        scrollContainer.scrollLeft += offSet;
  };

  return (
    <div className="mt-72 md:mt-0">
         <h1 className="text-2xl ml-2">Casts</h1>
      <div className="relative flex items-center group">
        <i
          className="fa-solid fa-circle-left absolute left-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
          onClick={() => slider(-500)}
        ></i>

        <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide movieCast">
          {creditMovie.cast &&
            creditMovie.cast.map(
              (cast) =>
                cast.profile_path && (
                  <div
                    key={cast.id}
                    className="relative w-[180px] h-[110px] inline-block rounded-lg bg-cover overflow-hidden cursor-auto m-2"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                      className="w-full h-40 block  origin-top"
                      alt={cast.name}
                    />
                    <div className="backDrop absolute top-0 left-0 w-full h-[110px] bg-black/80 opacity-0 hover:opacity-100 cursor-pointer flex justify-center items-center">
                      <p className="text-white">{cast.name}</p>
                    </div>
                  </div>
                )
            )}
        </div>
        <i
          className="fa-solid fa-circle-right absolute right-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
          onClick={() => slider(500)}
        ></i>
      </div>
    </div>
  );
};
