import { useNavigate } from 'react-router-dom';
import { Character } from '../RickAPI/characters';
import '../Style/CharactersTable.css';

export default function CharactersTable({characters}: {characters: Character[]}) {
    const navigate = useNavigate();

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Status</th>
                    <th>Species</th>
                    <th>Type</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {characters.map(
                    character => (
                        <tr key={character.id} onClick={() => navigate(`/character/${character.id}`)}>
                            <td>{character.name}</td>
                            <td>{character.status}</td>
                            <td>{character.species}</td>
                            <td>{character.type}</td>
                            <td>{character.gender}</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}