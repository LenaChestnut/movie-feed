import { Star } from 'react-feather';

function MovieItem(props) {
    const { title, posterUrl } = props.movieInfo;

    return (
        <li className="movie-item">
            <img width="185px" height="278px" src={posterUrl} alt={title} className="movie-poster"></img>
            <h2 className="movie-title">{title}</h2>
            <button type="button" className="favorite-button"><Star className="button-icon"/></button>
        </li>
    )
}

export default MovieItem;