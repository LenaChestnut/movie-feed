import MovieItem from "./MovieItem";
import { v4 as uuidv4 } from 'uuid';

function MovieList({movies, imgBaseUrl}) {
    return (
        <ul>
            {movies.map((movie) => {
                return <MovieItem movieInfo={{...movie, posterUrl: `${imgBaseUrl}w185${movie.poster_path}`}} key={uuidv4()} />;
            })}
        </ul>
    );
}

export default MovieList;