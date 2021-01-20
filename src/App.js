import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieItem from './components/MovieItem';
import { BASE_URL, API_KEY, getMovies, configPromise } from './utils';
import Menu from './components/Menu';

function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ moviesData, setMoviesData ] = useState([]);
  const [ currPage, setCurrPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(null);
  const [ configData, setConfigData ] = useState(null);
  const [ filteredGenres, setFilteredGenres ] = useState([]);

  useEffect(() => {
    (async () => {
      const movies = await getMovies(BASE_URL, API_KEY);
      const config = await configPromise;
      setMoviesData(movies.results);
      setCurrPage(movies.page);
      setTotalPages(movies.total_pages);
      setConfigData(config);
      setIsLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFiltered = (genre) => {
    if (filteredGenres.length === 0 || filteredGenres.indexOf(genre) >= 0) {
      return true;
    }
    return false;
  }

  const filterByGenre = (movies) => {
    const filtered = movies.filter(movie => {
      if (movie.genre_ids.some(id => isFiltered(id))) {
        return movie;
      }
      return null;
    });

    return filtered;
  }

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const movies = await getMovies(BASE_URL, API_KEY);
      const filtered = filterByGenre(movies.results);
      setMoviesData(filtered);
      setCurrPage(movies.page);
      setTotalPages(movies.total_pages);
      setIsLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredGenres]);

  return (
    <div className="App">
      <Menu setFilteredGenres={setFilteredGenres} filteredGenres={filteredGenres}></Menu>
      {isLoading
        ? <p className="loading-message">Loading...</p>
        : <InfiniteScroll
            dataLength={moviesData.length}
            next={() => {
              getMovies(BASE_URL, API_KEY, currPage + 1)
                .then(movies => {
                  const filtered = filterByGenre(movies.results);
                  setMoviesData([...moviesData, ...filtered]);
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
              />)
            )}
          </InfiniteScroll>
      }
    </div>
  );
}

export default App;
