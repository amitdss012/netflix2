import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesDetailsAsync,
} from "../redux/slice/movieSlices";
import { Casts } from "../components/Casts";
import { MovieImage } from "../components/MovieImage";
import { MovieRecommend } from "../components/MovieRecommend";
import Trailer from "../components/Trailer";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const MovieDetails = () => {
    const [likedMovies, setLikedMovies] = useState(new Set()); 
  const params = useParams();
  const dispatch = useDispatch();
  const {user} = UserAuth()

  const detailMovie = useSelector((state) => state.movie.movieDetails);

  useEffect(() => {
    dispatch(fetchMoviesDetailsAsync(params.id));
  }, [params.id]);

  const toggleLike = async (movie) => {
    const userEmail = user?.email;
    if (!userEmail) {
      console.log("login first");
      alert("first login to save movies");
      return;
    } else {
      const updatedLikedMovies = new Set(likedMovies);
      let operation;
      if (likedMovies.has(movie.id)) {
        updatedLikedMovies.delete(movie.id);
        operation = "remove"; // Indicate that we're removing the movie from Firestore
      } else {
        updatedLikedMovies.add(movie.id);
        operation = "add"; // Indicate that we're adding the movie to Firestore
      }
      setLikedMovies(updatedLikedMovies);

      // Update Firestore based on the operation
      const userDoc = doc(db, "users", userEmail);
      if (operation === "add") {
        await updateDoc(userDoc, {
          likedMovies: arrayUnion(movie),
        });
      } else {
        await updateDoc(userDoc, {
          likedMovies: arrayRemove(movie),
        });
      }
    }
  };



  return (
    <>
      <Navbar />
      <div className="h-full md:h-[80vh]">
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{
            backgroundImage: detailMovie
              ? `url(https://image.tmdb.org/t/p/original${detailMovie.backdrop_path})`
              : "none",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />

          <div className="absolute top-40 pl-5 w-full flex flex-col md:flex-row">
            <img
              className="w-60 h-full"
              src={`https://image.tmdb.org/t/p/w300${detailMovie.poster_path}`}
              alt=""
            />
            <div className="w-full ml-5 flex flex-col gap-3">
              <h1 className="text-2xl">{detailMovie.title}</h1>
              <p>{detailMovie.release_date}</p>

              <div className="flex flex-row gap-4">
                {detailMovie.genres &&
                  detailMovie.genres.map((genre) => {
                    return <p key={genre.id}>{genre.name},</p>;
                  })}
              </div>
              <div className="flex gap-10 items-center">
              <button
                  className=""
                  onClick={() => toggleLike(detailMovie)}
                >
                  {likedMovies.has(detailMovie.id) ? (
                    <i className="fa-solid fa-heart text-white text-3xl"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-white text-3xl"></i>
                  )}
                </button>
                <p className="bg-lime-400 w-40 h-10 text-center">
                  <Trailer />
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-gray-400">{detailMovie.tagline}</p>
                <div className="pr-5">
                  <span className="font-bold text-2xl mb-2">Overview</span>
                  <p className="pr-3">{detailMovie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Casts />
        <MovieImage />
        <MovieRecommend />
      </div>
    </>
  );
};
