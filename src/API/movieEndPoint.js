export const key = "918b08a5eb37289a3dba2e0ae4915b8d"
export const url = "https://api.themoviedb.org/3"



export const movieEndpoints = {
    nowPlaying: `${url}/movie/now_playing?api_key=${key}`,
    popular: `${url}/movie/popular?api_key=${key}`,
    topRated: `${url}/movie/top_rated?api_key=${key}`,
    upcoming: `${url}/movie/upcoming?api_key=${key}`,
    latest: `${url}/movie/latest?api_key=${key}`,
    trending: `${url}/trending/movie/week?api_key=${key}`,
    search: (query) => `${url}/search/movie?api_key=${key}&query=${query}`,
    details: (id) => `${url}/movie/${id}?api_key=${key}`,
    credits: (id) => `${url}/movie/${id}/credits?api_key=${key}`,
    reviews: (id) => `${url}/movie/${id}/reviews?api_key=${key}`,
    images: (id) => `${url}/movie/${id}/images?api_key=${key}`,
    recommendation: (id) => `${url}/movie/${id}/recommendations?api_key=${key}`,
    trailer: (id) => `${url}/movie/${id}/videos?api_key=${key}`,
}



