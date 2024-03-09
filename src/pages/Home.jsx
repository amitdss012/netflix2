// import React from 'react'
import Hero from '../components/Hero'
import { MovieSection } from "../components/MovieSection"
import { fetchComedyMovies, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../API/movieAPI'

export const Home = () => {
  return (
    <div>
        <Hero />
        <MovieSection MovieSectionName="Upcoming" fetchMovies={fetchUpcomingMovies}  />
        <MovieSection MovieSectionName="Popular" fetchMovies={fetchPopularMovies}  />
        <MovieSection MovieSectionName="Top Rated" fetchMovies={fetchTopRatedMovies}  />
        <MovieSection MovieSectionName="Trending" fetchMovies={fetchTrendingMovies}  />
        <MovieSection MovieSectionName="Comedy" fetchMovies={fetchComedyMovies}  />
    </div>
  )
}
