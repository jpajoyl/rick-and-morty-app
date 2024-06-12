import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import { GetCharactersData } from '../types/graphqlTypes';

export const useCharacters = (page: number, text: string, species: string) => {
    const { loading, error, data } = useQuery<GetCharactersData>(GET_CHARACTERS, {
        variables: {
            page,
            text,
            species
        }
    });
    return {
        loading,
        error,
        characters: data?.characters.results || [],
        charactersInfo: data?.characters.info
    };
};
