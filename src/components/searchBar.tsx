import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

interface SearchBarProps {
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterClick?: () => void;
    value?: string;
}

function SearchBar(props: SearchBarProps) {
    const { placeholder, onChange, onFilterClick, value } = props
    return (
        <div className="flex items-center w-full p-2 rounded-lg bg-slate-200 my-8">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-slate-400"></i>
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-0 text-slate-700 bg-transparent border-none rounded-lg focus:outline-none focus:ring-0"
                    value={value}
                />
            </div>
            <button onClick={onFilterClick} className="flex items-center justify-center w-10 h-10 text-purple-500 bg-slate-200 rounded-full hover:bg-slate-200 focus:outline-none ml-2">
                <i className="fas fa-filter"></i>
            </button>
        </div>
    )
}

export default SearchBar