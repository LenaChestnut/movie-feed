import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieItem from './components/MovieItem';
import { BASE_URL, API_KEY, getMovies, configPromise } from './utils';

function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ moviesData, setMoviesData ] = useState([]);
  const [ currPage, setCurrPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(null);
  const [ configData, setConfigData ] = useState(null);

  useEffect(() => {
    (async () => {
      const movies = await getMovies(BASE_URL, API_KEY);
      const config = await configPromise;
      setMoviesData([...moviesData, ...movies.results]);
      setCurrPage(movies.page);
      setTotalPages(movies.total_pages);
      setConfigData(config);
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
                })
                .catch(error => {
                  throw new Error(error);
                })
            }}
            hasMore={currPage < totalPages ? true : false}
            className="movie-list"
          >
            {moviesData.map((movie) => (
              <MovieItem 
                movieInfo={{...movie, posterUrl: `${configData.secure_base_url}w185${movie.poster_path}`}}
                key={movie.id} 
              />
            ))}
          </InfiniteScroll>
      }
    </div>
  );
}

export default App;
