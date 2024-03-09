
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies, fetchTrendingMovies, fetchUpcomingMovies, fetchComedyMovies, fetchTopRatedMovies, searchMovies, fetchMoviesDetails } from '../../API/movieAPI';
import axios from 'axios';
import { movieEndpoints } from '../../API/movieEndPoint';

export const fetchPopularMoviesAsync = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const response = await fetchPopularMovies();
    return response;
  }
);

export const fetchTrendingMoviesAsync = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async () => {
    const response = await fetchTrendingMovies();
    return response;
  }
);

export const fetchUpcomingMoviesAsync = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async () => {
    const response = await fetchUpcomingMovies();
    return response;
  }
);

export const fetchComedyMoviesAsync = createAsyncThunk(
  'movies/fetchComedyMovies',
  async () => {
    const response = await fetchComedyMovies();
    return response;
  }
);

export const fetchTopRatedMoviesAsync = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async () => {
    const response = await fetchTopRatedMovies();
    return response;
  }
);


export const fetchSearchMovies = createAsyncThunk(
    'movies/fetchSearchMovies',
    async (query) => {
      const response = await searchMovies(query);
      return response;
    }
  );


export const fetchMoviesDetailsAsync = createAsyncThunk(
    'movies/MoviesDetails',
    async (id) => {
        try {
            const res = await axios.get(movieEndpoints.details(id));
            return res.data;
          } catch (error) {
            console.error("Error fetching movie details:", error);
          }
    }
  );

export const fetchMoviesCreditAsync = createAsyncThunk(
    'movies/MoviesCredit',
    async (id) => {
        try {
            const res = await axios.get(movieEndpoints.credits(id));
            return res.data;
          } catch (error) {
            console.error("Error fetching movie credit:", error);
          }
    }
  );

export const fetchMoviesImagesAsync = createAsyncThunk(
    'movies/MoviesImages',
    async (id) => {
        try {
            const res = await axios.get(movieEndpoints.images(id));
            return res.data;
          } catch (error) {
            console.error("Error fetching movie credit:", error);
          }
    }
  );


export const fetchMoviesRecommendationAsync = createAsyncThunk(
    'movies/MoviesRecommendation',
    async (id) => {
        try {
            const res = await axios.get(movieEndpoints.recommendation(id));
            return res.data;
          } catch (error) {
            console.error("Error fetching movie credit:", error);
          }
    }
  );

export const fetchMoviesTrailerAsync = createAsyncThunk(
    'movies/MoviesTrailer',
    async (id) => {
        try {
            const res = await axios.get(movieEndpoints.trailer(id));
            return res.data;
          } catch (error) {
            console.error("Error fetching movie credit:", error);
          }
    }
  );


const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    trending: [],
    upcoming: [],
    comedy: [],
    topRated: [],
    searchResults: [],
    movieDetails: [],
    movieCredit: [],
    movieImages: [],
    trailer: [],
    movieRecommendation: [],
    isLoading: false,
    isError: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMoviesAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPopularMoviesAsync.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPopularMoviesAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchTrendingMoviesAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTrendingMoviesAsync.fulfilled, (state, action) => {
        state.trending = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTrendingMoviesAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchUpcomingMoviesAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUpcomingMoviesAsync.fulfilled, (state, action) => {
        state.upcoming = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUpcomingMoviesAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchComedyMoviesAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchComedyMoviesAsync.fulfilled, (state, action) => {
        state.comedy = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchComedyMoviesAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchTopRatedMoviesAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTopRatedMoviesAsync.fulfilled, (state, action) => {
        state.topRated = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTopRatedMoviesAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchSearchMovies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        console.log(action.payload)
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSearchMovies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchMoviesDetailsAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMoviesDetailsAsync.fulfilled, (state, action) => {
          state.movieDetails  = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMoviesDetailsAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchMoviesCreditAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMoviesCreditAsync.fulfilled, (state, action) => {
          state.movieCredit  = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMoviesCreditAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchMoviesImagesAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMoviesImagesAsync.fulfilled, (state, action) => {
          state.movieImages  = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMoviesImagesAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchMoviesRecommendationAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMoviesRecommendationAsync.fulfilled, (state , action) => {
        state.movieRecommendation = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMoviesRecommendationAsync.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchMoviesTrailerAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMoviesTrailerAsync.fulfilled, (state , action) => {
        state.trailer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMoviesTrailerAsync.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
  },
});

export default movieSlice.reducer;

