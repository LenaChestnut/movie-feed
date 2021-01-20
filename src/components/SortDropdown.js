import { useState } from 'react';

function SortDropdown({setSortBy, sortBy}) {
    const [ selected, setSelected ] = useState(sortBy);

    function handleChange(e) {
        setSelected(e.target.value);
    }
       
    function handleSubmit(e) {
        e.preventDefault();
        setSortBy(selected);
    }

    return (
        <form  className='settings-dropdown' onSubmit={(e) => handleSubmit(e)}>
            <fieldset className='sort-dropdown'>
                <div className='sort-option'>
                    <input 
                        type='radio' 
                        id='popularity' 
                        name='sortBy' 
                        value='popularity.desc' 
                        checked={selected === 'popularity.desc'}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor='popularity'>По популярности</label>
                </div>
                <div className='sort-option'>
                    <input 
                        type='radio' 
                        id='rating' 
                        name='sortBy' 
                        value='vote_average.desc'
                        checked={selected === 'vote_average.desc'}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor='rating'>По рейтингу</label>
                </div>
                <div className='sort-option'>
                    <input 
                        type='radio' 
                        id='release' 
                        name='sortBy' 
                        value='release_date.desc'
                        checked={selected === 'release_date.desc'}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor='release'>По новизне</label>
                </div>
            </fieldset>
            <input type='submit' className='form-button' value='OK'></input>
        </form>
    );
}

export default SortDropdown;