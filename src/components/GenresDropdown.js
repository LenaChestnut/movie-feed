import { useState } from 'react';

function GenresDropdown({genresInfo, setFilteredGenres, filteredGenres}) {
    const [ genres ] = useState([...genresInfo.genres]);
    const [ selected, setSelected ] = useState(filteredGenres);

    const genreList = genres.map((genre) =>
        <div key={genre.id} className='genre-option'>
            <input 
                type='checkbox' 
                name={genre.name} 
                id={genre.id} 
                value={genre.id} 
                onChange={(e) => handleChange(e)}
                defaultChecked={selected.indexOf(genre.id) >= 0 ? true : false}
            ></input>
            <label htmlFor={genre.id}>{genre.name}</label>
        </div>
    );

    function handleChange(e) {
        const value = parseInt(e.target.value);
        if (selected.indexOf(value) >= 0) {
            setSelected(selected.filter((item) => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    }
       
    function handleSubmit(e) {
        e.preventDefault();
        setFilteredGenres(selected);
    }

    return (
        <form  className='settings-dropdown' onSubmit={(e) => handleSubmit(e)}>
            <fieldset className='genres-dropdown'>
                {genreList}
            </fieldset>
            <input type='submit' className='form-button' value='OK'></input>
        </form>
    );
}

export default GenresDropdown;