import { useEffect, useState } from 'react';
import { Star } from 'react-feather';
import { BASE_URL, API_KEY, getMovieById, configPromise } from '../utils';

function MovieCard({ match: {params: {id}} }) {
    const [ movieInfo, setMovieInfo ] = useState({});

    useEffect(() => {
        (async () => {
            const data = await getMovieById(BASE_URL, API_KEY, id);
            setMovieInfo(data);
        })();
    }, [])

    return (
        <div className="movie-card">
            <h1>Movie Card</h1>
            {/* <img width="185px" height="278px" src={posterUrl} alt={title} className="movie-poster" loading="lazy"></img>
            <h2 className="movie-title">{title}</h2>
            <button type="button" className="favorite-button"><Star className="button-icon"/></button> */}
        </div>
    )
}

export default MovieCard;