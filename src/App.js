import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieItem from './components/MovieItem';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ moviesData, setMoviesData ] = useState({movies: [], page: 1});
  const [ configData, setConfigData ] = useState(null);
  const BASE_URL = 'https://api.themoviedb.org/3/';
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  async function getConfiguration(baseUrl, key) {
    let url = `${baseUrl}configuration?api_key=${key}&language=ru-RU`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.images;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getMovies(baseUrl, key, page = 1) {
    let url = `${baseUrl}discover/movie?api_key=${key}&language=ru-RU&page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const movies = await getMovies(BASE_URL, API_KEY);
      const configuration = await getConfiguration(BASE_URL, API_KEY);
      setMoviesData({movies: [...moviesData.movies, ...movies.results], page: movies.page, totalPages: movies.total_pages});
      setConfigData(configuration);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="App">
      {isLoading
        ? <p className="loading-message">Loading...</p>
        : <InfiniteScroll
            dataLength={moviesData.movies.length}
            next={() => {
              getMovies(BASE_URL, API_KEY, moviesData.page + 1)
                .then(movies => setMoviesData({...moviesData, movies: [...moviesData.movies, ...movies.results], page: movies.page}));
            }}
            hasMore={moviesData.page < moviesData.totalPages ? true : false}
            className="movie-list"
          >
            {moviesData.movies.map((movie) => (
              <MovieItem movieInfo={{...movie, posterUrl: `${configData.secure_base_url}w185${movie.poster_path}`}} key={uuidv4()} />
            ))}s
          </InfiniteScroll>
      }
    </div>
  );
}

export default App;
