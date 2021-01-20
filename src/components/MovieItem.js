import { Star } from 'react-feather';
import { Link } from 'react-router-dom';

function MovieItem(props) {
    const { title, posterUrl, id } = props.movieInfo;

    return (
        <li className="movie-item">
            <Link to={`/movie/${id}`}>
                <div className="movie-poster">
                    <img width="185px" height="278px" src={posterUrl} alt={title} className="movie-poster" loading="lazy"></img>
                </div>
                <h2 className="movie-title">{title}</h2>
            </Link>
            <button type="button" className="favorite-button"><Star className="button-icon"/></button>
        </li>
    )
}

export default MovieItem;