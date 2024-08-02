export async function getCharacters(filter: Query, page: number = 1): Promise<CharacterResponse> {
    const url = new URL('https://rickandmortyapi.com/api/character');
    url.search += new URLSearchParams(filter as any).toString();
    url.searchParams.append('page', page.toString());
    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error((await response.json()).error);
    } else {
        return response.json();
    }
}

export async function getCharacter(id: number): Promise<Character> {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) {
        throw new Error((await response.json()).error);
    } else {
        return response.json();
    }
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface CharacterResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Character[];
}

export interface Query {
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
}