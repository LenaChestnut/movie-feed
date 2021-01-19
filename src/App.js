import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';


function App() {
  const [ isDataLoaded, setIsDataLoaded ] = useState(false);
  const [ moviesData, setMoviesData ] = useState({});
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
  
  async function getMovies(baseUrl, key) {
    let url = `${baseUrl}discover/movie?api_key=${key}&language=ru-RU`;
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
      setMoviesData(movies);
      setConfigData(configuration);
      setIsDataLoaded(true);
    })();
  }, []);

  return (
    <div className="App">
      {isDataLoaded
        ? <MovieList movies={moviesData.results} imgBaseUrl={configData.secure_base_url}/>
        : <p className="loading-message">Loading...</p>}
    </div>
  );
}

export default App;
