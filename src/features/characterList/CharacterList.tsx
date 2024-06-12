import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';
import { useCharacters } from '../../hooks/useCharacters';
import SearchBar from '../../components/searchBar';
import { Character } from '../../types/graphqlTypes';
import FilterDialog from '../../components/filterDialog';
import { FilterData } from '../../types/models';
import CharactersShow from '../../components/charactersShow';

const CharacterList: React.FC = () => {
    const navigate = useNavigate();
    const routerLocation = useReactRouterLocation();
    const [page, setPage] = useState(1)
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<Character>()
    const [allCharacters, setAllCharacters] = useState<Character[]>([])
    const [searchValue, setSearchValue] = useState('');
    const [orderAllCharacters, setOrderAllCharacters] = useState('');
    const [orderSelectedCharacters, setOrderSelectedCharacters] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    const [filterData, setFilterData] = useState<FilterData[]>([
        {
            title: 'Character',
            options: [
                {
                    text: 'All',
                    selected: true,
                    value: ''
                },
                {
                    text: 'Starred',
                    selected: false,
                    value: ''
                },
                {
                    text: 'Others',
                    selected: false,
                    value: ''
                },
            ]
        },
        {
            title: 'Specie',
            options: [
                {
                    text: 'All',
                    selected: false,
                    value: ''
                },
                {
                    text: 'Human',
                    selected: false,
                    value: 'Human'
                },
                {
                    text: 'Alien',
                    selected: false,
                    value: 'Alien'
                },
            ]
        },
    ])
    const [speciesValue, setSpeciesValue] = useState('');
    const [showStarred, setShowStarred] = useState(true)
    const [showCharacters, setShowCharacters] = useState(true)

    const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);

    const isHome = routerLocation.pathname === '/';


    const { characters, charactersInfo } = useCharacters(page, searchValue, speciesValue);

    const handleResize = () => {
        setIsMdUp(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setAllCharacters(prevCharacters => {
            if (page === 1) return characters
            return [...prevCharacters, ...characters]
        });
    }, [characters, page])



    const characterSelection = (character: Character) => {
        setSelectedCharacters(prevState => {
            return prevState.includes(character) ? prevState.filter(c => c.id !== character.id) : [...prevState, character]
        })
    }

    function handleScroll(e: any): void {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            if (charactersInfo?.next) {
                setPage(charactersInfo?.next)
            }

        }
    }


    function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(event.target.value)
        setPage(1)
    }

    function handleSort(selectedList: boolean): void {
        if (selectedList) {
            setOrderSelectedCharacters(orderSelectedCharacters === 'asc' ? 'desc' : 'asc')
        } else {
            setOrderAllCharacters(orderAllCharacters === 'asc' ? 'desc' : 'asc')
        }
    }

    function handleFilterData(): void {
        for (const filter of filterData) {
            if (filter.title === 'Character') {
                const characterOption = filter.options.find(op => op.selected)
                if (characterOption) {
                    if (characterOption.text === 'Starred') {
                        setShowStarred(true)
                        setShowCharacters(false)
                    } else if (characterOption.text === 'Others') {
                        setShowStarred(false)
                        setShowCharacters(true)
                    } else {
                        setShowStarred(true)
                        setShowCharacters(true)
                    }
                } else {
                    setShowStarred(true)
                    setShowCharacters(true)
                }

            } else if (filter.title === 'Specie') {
                const optionSpecie = filter.options.find(op => op.selected)
                if (optionSpecie) {
                    setSpeciesValue(optionSpecie.value)
                } else {
                    setSpeciesValue('')
                }
            }
        }
        setShowFilter(false)
    }

    function handleSelectedCharacter(character: Character) {
        setSelectedCharacter(character)
        navigate(`/character/${character.id}`)
    }

    return (
        <div className={`w-full md:w-1/4 overflow-auto h-screen scrollbar-hide ${(isMdUp && isHome) && 'block'} ${!isHome && 'hidden md:block'}`} onScroll={handleScroll}>
            <div className="bg-slate-50 p-5">
                <h1 className="text-3xl font-bold leading-8 pt-10">Rick and Morty list</h1>
                <SearchBar placeholder='Search or filter results' value={searchValue} onChange={handleSearchChange} onFilterClick={() => setShowFilter(!showFilter)} />
                {showFilter && (<FilterDialog filterData={filterData} setFilterData={setFilterData} setShowFilter={setShowFilter} onClose={() => handleFilterData()} />)}
                {!!filterData.find(fd => fd.title !== 'Character')?.options.find(op => op.selected) && (
                    <h3 className="text-lg my-1 font-normal flex justify-between">
                        <span className="text-blue-500">{charactersInfo?.count || 0} Results</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{filterData.filter(fd => fd.title !== 'Character').length} Filter</span>
                    </h3>
                )}
                {showStarred && (
                    <CharactersShow
                        title='Starred characters'
                        charactersList={selectedCharacters.sort((a, b) => {
                            if (orderSelectedCharacters === 'asc') {
                                return a.name.localeCompare(b.name)
                            } else if (orderSelectedCharacters === 'desc') {
                                return b.name.localeCompare(a.name)
                            }
                            return 0
                        })}
                        handleSort={handleSort}
                        selectedCharacter={selectedCharacter}
                        handleSelectedCharacter={handleSelectedCharacter}
                        characterSelection={characterSelection}
                        isSelectedList={true}
                        divisions={false}
                        length={selectedCharacters.length}
                    />
                )}
                {showCharacters && (
                    <CharactersShow
                        title='Characters'
                        charactersList={allCharacters
                            .filter(c => !selectedCharacters.find(ca => ca.id === c.id))
                            .sort((a, b) => {
                                if (orderAllCharacters === 'asc') {
                                    return a.name.localeCompare(b.name)
                                } else if (orderAllCharacters === 'desc') {
                                    return b.name.localeCompare(a.name)
                                }
                                return 0
                            })}
                        handleSort={handleSort}
                        selectedCharacter={selectedCharacter}
                        handleSelectedCharacter={handleSelectedCharacter}
                        characterSelection={characterSelection}
                        isSelectedList={false}
                        divisions={true}
                        length={charactersInfo?.count || 0}
                    />
                )}

            </div>
        </div>

    );
};

export default CharacterList;
