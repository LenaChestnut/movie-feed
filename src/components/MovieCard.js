import { useEffect, useState } from 'react';
import { Star } from 'react-feather';
import { BASE_URL, API_KEY, getMovieById, configPromise } from '../utils';

function MovieCard({ match: {params: {id}} }) {
    const [ movieInfo, setMovieInfo ] = useState({});
    const [ imagesInfo, setImagesInfo ] = useState({});
    const [ favorites, setFavorites ] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(() => {
        (async () => {
            const movie = await getMovieById(BASE_URL, API_KEY, id);
            const config = await configPromise;

            const posterSrc = `${config.secure_base_url}w500${movie.poster_path}`;
            const posterSrcSet = config.poster_sizes.map((width) => {
                    const numWidth = parseInt(width.match(/\d+/));
                    return (numWidth >= 154) && (numWidth <=500)
                    ? `${config.secure_base_url}${width}${movie.poster_path} ${numWidth}w`
                    : null;
                })
                .filter((src) => src != null)
                .join(', ');
            
            setImagesInfo({posterSrc, posterSrcSet})
            setMovieInfo(movie);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = (e, id) => {
        if (favorites.indexOf(id) >= 0) {
            setFavorites(favorites.filter((item) => item !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

    return (
        <div className='movie-card'>
            <div className="poster-container">
                <img
                    srcSet={imagesInfo.posterSrcSet}
                    sizes='(max-width: 500px) 154px 185px 300px 500px'
                    src={imagesInfo.posterSrc}
                    alt={movieInfo.title}
                    className="movie-poster card-movie-poster"
                ></img>
            </div>
            <div className='info-container'>
                <h1 className='movie-card__title movie-title'>{movieInfo.title}</h1>
                <h2 className='movie-card__title original-title'>{movieInfo.original_title}</h2>
                <button type='button' className='card-favorite-button' onClick={(e) => handleClick(e, movieInfo.id)}>
                    <Star className="button-icon" style={favorites.indexOf(movieInfo.id) >= 0 ? {color: 'rgb(255 248 38)'} : null}/>
                </button>
                <h3 className='movie-genres'>
                    Жанр: {movieInfo.genres ? movieInfo.genres.map(genre => genre.name).join(', ') : null }
                </h3>
                <p className='movie-overview'>{movieInfo.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard;