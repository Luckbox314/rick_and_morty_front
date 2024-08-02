import { getCharacter , Character } from "../RickAPI/characters";
import { useLoaderData, LoaderFunctionArgs, Link } from "react-router-dom";

export async function loader({params}: LoaderFunctionArgs<{id: string}> ) {
    if (!params.id) {
        return { character: null };
    }
    const character = await getCharacter(parseInt(params.id));
    return { character };
}


export default function CharacterView() {
    const { character } = useLoaderData() as { character: Character };

    return (
        <>
            <Link to='/'>Back to characters</Link>
            <div id="character">
                <h1>{character.name}</h1>
                <p>ID: {character.id}</p>
                <p>Specie: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Status: {character.status}</p>
                <p>Type: {character.type}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Location: {character.location.name}</p>
                <img src={character.image} alt={character.name} />
            </div>
        </>
    )
}