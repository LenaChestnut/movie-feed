const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY;

const configPromise = (async (baseUrl, key) => {
    const url = `${baseUrl}configuration?api_key=${key}&language=ru-RU`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.images;
    } catch (error) {
        console.log(error);
    }
})(BASE_URL, API_KEY);
  
async function getMovies(baseUrl, key, page = 1) {
    const url = `${baseUrl}discover/movie?api_key=${key}&language=ru-RU&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getMovieById(baseUrl, key, id) {
    const url = `${baseUrl}movie/${id}?api_key=${key}&language=ru-RU`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getGenres(baseUrl, key) {
    const url = `${baseUrl}genre/movie/list?api_key=${key}&language=ru-RU`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { BASE_URL, API_KEY, getMovies, getMovieById, getGenres, configPromise };