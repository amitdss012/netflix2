import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesRecommendationAsync } from '../redux/slice/movieSlices';
import { useNavigate, useParams } from 'react-router-dom';

export const MovieRecommend = () => {

    const movieRecommend = useSelector((state) => state.movie.movieRecommendation.results)
    const dispatch = useDispatch();
    const params = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchMoviesRecommendationAsync(params.id))
    },[params.id])

    const slider = (offset) => {
        const scrollContainer = document.querySelector('.recommendtion');
        scrollContainer.scrollLeft += offset;
    };


  return (
    <>
    <h2 className="text-white mt-2 ml-2 text-xl">Recommneded Movies</h2>
      <div className="relative flex items-center group">
        <i
          className="fa-solid fa-circle-left absolute left-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
          onClick={() => slider(-500)}
        ></i>

        <div
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide recommendtion"
        >
          {movieRecommend && movieRecommend.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/details/${movie.id}`)}
              className="relative w-[180px] h-[110px] inline-block rounded-lg bg-cover overflow-hidden cursor-auto m-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                className="w-full h-40 block  origin-top"
                alt={movie.title}
              />
              <div className="backDrop absolute top-0 left-0 w-full h-[110px] bg-black/80 opacity-0 hover:opacity-100 cursor-pointer flex justify-center items-center">
                <p className="text-white object-fill movieTitle">{movie.title}</p>
                <button
                  className="absolute top-2 left-2"
                >
                </button>
              </div>
            </div>
          ))}
        </div>
        <i
          className="fa-solid fa-circle-right absolute right-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
          onClick={() => slider(500)}
        ></i>
      </div>
    
    </>
  )
}
