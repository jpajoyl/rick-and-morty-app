import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '../graphql/queries';
import { GetCharacterData } from '../types/graphqlTypes';

export const useCharacter = (id: string) => {
    const { loading, error, data } = useQuery<GetCharacterData>(GET_CHARACTER, {
        variables: {
            id
        }
    });
    return {
        loading,
        error,
        character: data?.character
    };
};
