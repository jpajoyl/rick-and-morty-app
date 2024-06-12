export interface Character {
    id: string;
    species: string;
    status: string;
    image: string;
    name: string;
    gender: string;
}
export interface Info {
    count: number;
    pages: number;
    prev: number;
    next: number;
}

export interface GetCharactersData {
    characters: {
        results: Character[];
        info: Info
    };
}

export interface GetCharacterData {
    character: Character;
}