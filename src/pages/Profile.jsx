import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

export const Profile = () => {
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();
  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) {
      onSnapshot(doc(db, "users", userEmail), (doc) => {
        if (doc.data()) {
          setMovies(doc.data().likedMovies);
        }
      });
    }
  }, [userEmail]);

  const slider = (offSet) => {
    const slide = document.getElementById("MovieSectionName");
    slide.scrollLeft = slide.scrollLeft + offSet;
  };

  const handleRomveMovie = async (movie) => {
    const userDoc = doc(db, "users" , userEmail);
    await updateDoc(userDoc , {
      likedMovies: arrayRemove(movie),
    })
  }

  return (
    <>
      <div className='profilePage relative h-[70vh] bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg")] bg-cover '>
        <div className="profileBakcdrop bg-black/50 fixed top-0 left-0 w-full h-[70vh]" />

        <div className="userEmail absolute top-[20%] p-4 md:p-8">
          <h1 className="text-4xl">Your Profile</h1>
          <p className="mt-3 text-gray-300">{userEmail}</p>
        </div>
      </div>

        {/* movie Rows */}
      <h3 className="font-bold mt-3 ml-2 text-red-600 text-2xl">Your favorite Movies & Shows</h3>
      {movies.length > 0 ? (
        <div className="relative flex items-center group">
          <i
            className="fa-solid fa-circle-left absolute left-2 bg-white opacity-80 text-4xl z-50 rounded-[100%] text-black cursor-pointer hidden md:group-hover:block"
            onClick={() => slider(-500)}
          ></i>

          <div
            id="MovieSectionName"
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative w-[160px] inline-block rounded-lg overflow-hidden cursor-auto m-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="w-full h-40 block object-cover origin-top"
                  alt={movie.title}
                />
                <div className="backDrop absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                  <p className="text-white h-full flex justify-center items-center">
                    {movie.title}
                  </p>
                  <button
                  className="absolute top-0 right-2"
                  onClick={() => handleRomveMovie(movie)}
                >
                    <i className="fa-solid fa-xmark text-white text-2xl"></i>
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
      ) : (
        <p className="pl-2">you have not saved any movie to watch later</p>
      )}
    </>
  );
};
