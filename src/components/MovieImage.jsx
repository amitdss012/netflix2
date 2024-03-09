import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesImagesAsync } from "../redux/slice/movieSlices";
import { useParams } from "react-router-dom";

export const MovieImage = () => {
  const movieImage = useSelector((state) => state.movie.movieImages.backdrops);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchMoviesImagesAsync(params.id));
  }, [params.id]);

  const slider = (offset) => {
    const scrollContainer = document.querySelector(".sliderImage");
    scrollContainer.scrollLeft += offset;
  };

  return (
    <>
      <div className=" md:mt-0">
      {movieImage && movieImage.length > 0 ? <h1 className="text-2xl ml-2">Movie Images</h1>:  <></>}
        <div className="relative flex items-center group movieCast">
          <i
            className="fa-solid fa-circle-left absolute left-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
            onClick={() => slider(-500)}
          ></i>

          <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide sliderImage">
            {movieImage && movieImage.map(
                (cast, index) =>
                  cast.file_path && (
                    <div
                      key={index}
                      className="relative w-[180px] h-[110px] inline-block rounded-lg bg-cover overflow-hidden cursor-auto m-2"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w300${cast.file_path}`}
                        className="w-full h-40 block  origin-top"
                        alt={cast.name}
                      />
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
    </>
  );
};
