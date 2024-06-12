import React from 'react'
import { Character } from '../types/graphqlTypes'

interface CharactersShowProps {
    charactersList: Character[];
    handleSort: (selectedList: boolean) => void;
    selectedCharacter?: Character;
    handleSelectedCharacter: (character: Character) => void;
    characterSelection: (character: Character) => void;
    isSelectedList: boolean;
    title: string;
    divisions: boolean;
    length: number;
}

const CharactersShow = (props: CharactersShowProps) => {
    const { length, divisions, title, charactersList, selectedCharacter, handleSort, handleSelectedCharacter, characterSelection, isSelectedList } = props
    return (
        <div>
            <h3 className="text-lg my-1 font-normal flex items-center">
                {title} ({length})
                <span onClick={() => handleSort(isSelectedList)} className="ml-auto cursor-pointer">
                    <i className="fa-solid fa-sort"></i>
                </span>
            </h3>
            <ul className={`${divisions && 'divide-y'} mb-4`}>
                {charactersList
                    .map((character) => (
                        <li key={character.id} className={`flex items-center p-3 hover:bg-purple-100 rounded-lg ${!!(selectedCharacter?.id === character.id) ? 'bg-purple-100' : ''}`}>
                            <img src={character.image} alt={character.name} className="w-10 h-10 rounded-full mr-2" />
                            <div onClick={() => handleSelectedCharacter(character)} >
                                <p className="font-bold">{character.name}</p>
                                <p className="text-sm text-slate-600">{character.species}</p>
                            </div>
                            <i className={`${isSelectedList && 'text-green-500'} ${isSelectedList ? 'fa-solid' : 'fa-regular'} ml-auto fa-heart rounded-full p-1 cursor-pointer`} onClick={() => characterSelection(character)}></i>
                        </li>
                    ))}
            </ul>
        </div >
    )
}

export default CharactersShow