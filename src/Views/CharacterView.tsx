import { getCharacter , Character } from "../RickAPI/characters";
import { useLoaderData, LoaderFunctionArgs, useNavigate } from "react-router-dom";
import '../Style/CharacterView.css';

export async function loader({params}: LoaderFunctionArgs<{id: string}> ) {
    if (!params.id) {
        return { character: null };
    }
    const character = await getCharacter(parseInt(params.id));
    return { character };
}


export default function CharacterView() {
    const { character } = useLoaderData() as { character: Character };
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('/')}>
                Back to characters
            </button>
            <div className="center">
                <div>
                    <h1>{character.name}</h1>
                    <img src={character.image} alt={character.name} />
                    <div className="info">
                        <p><b>ID:</b> {character.id}</p>
                        <p><b>Specie:</b> {character.species}</p>
                        <p><b>Gender:</b> {character.gender}</p>
                        <p><b>Status:</b> {character.status}</p>
                        <p><b>Type:</b> {character.type}</p>
                        <p><b>Origin:</b> {character.origin.name}</p>
                        <p><b>Location:</b> {character.location.name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}