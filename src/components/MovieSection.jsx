import React, { useEffect, useState, useRef } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const MovieSection = ({ MovieSectionName, fetchMovies }) => {
  const [movies, setMovies] = useState([]);
  // Track liked movies by ID
  
  const { user } = UserAuth();
  console.log("user" , user)

  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    getMovies();
  }, [fetchMovies]); // Include fetchMovies in dependency array if it's expected to change


  // Save liked movies to localStorage whenever the likedMovies state changes



  const slider = (offSet) => {
    const slide = document.getElementById(MovieSectionName);
    slide.scrollLeft = slide.scrollLeft + offSet;
  };

  return (
    <>
      <h2 className="text-white mt-2 ml-2 text-xl">{MovieSectionName}</h2>
      <div className="relative flex items-center group">
        <i
          className="fa-solid fa-circle-left absolute left-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
          onClick={() => slider(-500)}
        ></i>

        <div
          id={MovieSectionName}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
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
                <p className="text-white">{movie.title}</p>
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
  );
};
