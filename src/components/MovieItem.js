function MovieItem(props) {
    const { title, posterUrl } = props.movieInfo;

    return (
        <li className="movie-item">
            <h2>{title}</h2>
            <img width="185px" height="278px" src={posterUrl} alt={title}></img>
        </li>
    )
}

export default MovieItem;