import { Star } from 'react-feather';
import { Link } from 'react-router-dom';

function MovieItem({movieInfo, favorites, setFavorites}) {
    const { title, posterUrl, id } = movieInfo;

    const handleClick = (e, id) => {
        if (favorites.indexOf(id) >= 0) {
            setFavorites(favorites.filter((item) => item !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    }

    return (
        <li className="movie-item">
            <Link to={`/movie/${id}`}>
                <div className="movie-poster-background">
                    <img width="185px" height="278px" src={posterUrl} alt={title} className="movie-poster" loading="lazy"></img>
                </div>
                <h2 className="movie-title">{title}</h2>
            </Link>
            <button type="button" className="favorite-button" onClick={(e) => handleClick(e, id)}>
                <Star className="button-icon" style={favorites.indexOf(id) >= 0 ? {color: 'rgb(255 248 38)'} : null}/>
            </button>
        </li>
    )
}

export default MovieItem;