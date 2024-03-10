
import { useEffect, useState } from "react";
import axios from "axios";
import HeroTailer from "./HeroTrailer";
import { useDispatch, useSelector } from "react-redux";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const trailer = useSelector((state) => state.movie.trailer?.results);


  const key = "918b08a5eb37289a3dba2e0ae4915b8d"
const url = "https://api.themoviedb.org/3"

  useEffect(() => {
    if (trailer && trailer.length > 0) {
      const trailerID = trailer.find((item) => item.type === "Trailer");
      if (trailerID) {
        setTrailerKey(trailerID.key);
      }
    }
  }, [trailer]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await axios.get(
        `${url}/trending/movie/week?api_key=${key}`
      );
      const data = trendingMovies.data.results;
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setMovie(data[randomIndex]);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        if (movie) {
          const trailerMovie = await axios.get(
            `${url}/movie/${movie.id}/videos?api_key=${key}`
          );
          const data = trailerMovie.data.results;
          const trailerID = data.find((item) => item.type === "Trailer");
          if (trailerID) {
            setTrailerKey(trailerID.key);
          }
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie]);


  return (
    <div className="hero h-[80vh] text-white relative">
      <iframe
        id="youtubeIframe"
        className="w-screen aspect-video h-[70vh] md:h-[100vh]"
        src={`https://www.youtube.com/embed/${trailerKey}?mute=1&controls=0&autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div className=" bg-opacity-50 flex items-center w-[100%] h-full absolute top-[20%]">
        <div className="px-10 max-w-xl">
          <h6 className="text-3xl font-bold text-orange-400">{movie?.title}</h6>
          <div className="mt-6 mb-3 flex">
            <p className="bg-gray-600 justify-center items-center"
            >
              <HeroTailer movieId={movie?.id} />
            </p>
            {/* <button className="border-gray-400 ml-3 h-10 p-2 capitalize border">
              Watch Later
            </button> */}
          </div>
          <p>{movie?.release_date}</p>
          <p className="mt-4 text-white">{movie?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

