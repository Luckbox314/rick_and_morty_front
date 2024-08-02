import { Link} from 'react-router-dom';
import { Character } from '../RickAPI/characters';

export default function CharactersTable({characters}: {characters: Character[]}) {
    return (
        <div>
            <ul>
                {characters.map(character => (
                    <li key={character.id}>
                        <Link to={`/character/${character.id}`}>{character.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}