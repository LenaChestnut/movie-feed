import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieItem from './components/MovieItem';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ moviesData, setMoviesData ] = useState([]);
  const [ currPage, setCurrPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(null);
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
      setMoviesData([...moviesData, ...movies.results]);
      setCurrPage(movies.page);
      setTotalPages(movies.total_pages);
      setConfigData(configuration);
      setIsLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {isLoading
        ? <p className="loading-message">Loading...</p>
        : <InfiniteScroll
            dataLength={moviesData.length}
            next={() => {
              getMovies(BASE_URL, API_KEY, currPage + 1)
                .then(movies => {
                  setMoviesData([...moviesData, ...movies.results]);
                  setCurrPage(movies.page);
                });
            }}
            hasMore={currPage < totalPages ? true : false}
            className="movie-list"
          >
            {moviesData.map((movie) => (
              <MovieItem movieInfo={{...movie, posterUrl: `${configData.secure_base_url}w185${movie.poster_path}`}} key={uuidv4()} />
            ))}
          </InfiniteScroll>
      }
    </div>
  );
}

export default App;
