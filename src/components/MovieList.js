import MovieItem from "./MovieItem";
import { v4 as uuidv4 } from 'uuid';
// import InfiniteScroll from 'react-infinite-scroll-component';

function MovieList({movies, imgBaseUrl, getMovies}) {
    return (
        <ul className="movie-list">
            {/* <InfiniteScroll
                dataLength={movies.length}
                next={() => {getMovies()}}
            >
            </InfiniteScroll> */}
            {movies.map((movie) => {
                return <MovieItem movieInfo={{...movie, posterUrl: `${imgBaseUrl}w185${movie.poster_path}`}} key={uuidv4()} />;
            })}
        </ul>
    );
}

export default MovieList;