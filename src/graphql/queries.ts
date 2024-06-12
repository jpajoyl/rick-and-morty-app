import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
    query GetCharacters($page: Int, $text: String, $species: String) {
    characters(page: $page, filter: {name: $text, species: $species}) {
        results {
        id
        name
        image
        species
        }
        info {
        count
        pages
        prev
        next
        }
    }
    }
`;

export const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
    character(id: $id) {
       id
        species
        status
        image
        name
        gender
    }
    }
`;
/* , status: $text, species: $text, type: $text, gender: $text */