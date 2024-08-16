import { useState, useEffect } from 'react';
import CharactersTable from './CharactersTable';
import { getCharacters } from '../RickAPI/characters';
import { Character, CharacterResponse, Query } from '../RickAPI/characters';
import '../Style/CharactersView.css';

export default function CharactersView() {
    const storedQuery = localStorage.getItem('query');
    const storedPage = localStorage.getItem('page');

    const [query, setQuery] = useState<Query>(storedQuery? 
        JSON.parse(storedQuery) : { name: '', status: '', species: '', type: '', gender: '' }
    );
    const [page, setPage] = useState(storedPage? JSON.parse(storedPage) : 1);

    const [characters, setCharacters] = useState<Character[]>([]);
    const [info, setInfo] = useState<CharacterResponse['info'] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;
        localStorage.setItem('query', JSON.stringify(query));
        localStorage.setItem('page', JSON.stringify(page));
        getCharacters(query, page).then(response => {
            console.log(ignore);
            if (!ignore) {
                setError('');
                setCharacters(response.results);
                setInfo(response.info);
            }
        }).catch(error => {
            if (!ignore) {
                setError(error.message);
                setCharacters([]);
                setInfo(null);
            }
        });
        return () => { ignore = true; console.log("callback")}
    }, [query, page]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPage(1);
        setQuery({ ...query, [e.target.name]: e.target.value});
    }

    return (
        <div id="character">

            <h1>List of characters</h1>

            <div className='search-bar'>

                <label>
                    <span>name:</span>
                    <input name='name' type="text" value={query.name} onChange={handleInputChange}/>
                </label>

                <label>
                    <span>status:</span>
                    <select name='status' value={query.status} onChange={handleInputChange}>
                        <option value="">All</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>   
                </label>

                <label>
                    <span>species:</span>
                    <input name='species' type="text" value={query.species} onChange={handleInputChange}/>
                </label>

                <label>
                    <span>type:</span>
                    <input name='type' type="text" value={query.type} onChange={handleInputChange}/>
                </label>

                <label>
                    <span>gender:</span>
                    <select name='gender' value={query.gender} onChange={handleInputChange}>
                        <option value="">All</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </label>

            </div>

            {error && <p>{error}</p>}
            <CharactersTable characters={characters}/>

            { info &&
                <div className='center'>
                    <div className='pagination'>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <span>page {page} of {info.pages}</span>
                        <button onClick={() => setPage(page + 1)} disabled={page === info.pages}>Next</button>
                    </div>
                </div>

            }
        </div>
    )
}