import { useState, useEffect } from 'react';
import GenresDropdown from './GenresDropdown';
import { BASE_URL, API_KEY, getGenres } from '../utils';

function Menu({setFilteredGenres, filteredGenres}) {
    const [ active, setActive ] = useState('');
    const [ genres, setGenres ] = useState([])

    useEffect(() => {
        (async () => {
            const genres = await getGenres(BASE_URL, API_KEY);
            setGenres(genres);
        })();
    }, [])

    function handleClick(e) {
        if (e.target.classList.contains(active)) {
            setActive('');
        } else {
            if (e.target.classList.contains('genres')) {
                setActive('genres');
            } else if (e.target.classList.contains('sort')) {
                setActive('sort');
            }
        }
    }

    return (
        <header>
            <ul className='search-settings' onClick={(e) => handleClick(e)}>
                <li className='settings-option genres'>Жанры</li>
                <li className='settings-option sort'>Сортировать</li>
                <li className='settings-option'>Избранное</li>
            </ul>
            {
                active === 'genres' ? <GenresDropdown genresInfo={genres} setFilteredGenres={setFilteredGenres} filteredGenres={filteredGenres}></GenresDropdown> :
                active === 'sort' ? <div className='settings-dropdown sort-dropdown'><p>Text</p></div> :
                null
            }
        </header>
    );
}

export default Menu;