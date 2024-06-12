import React from 'react'
import { FilterData } from '../types/models'

interface FilterDialogProps {
    onClose: () => void
    filterData: FilterData[]
    setFilterData: React.Dispatch<React.SetStateAction<FilterData[]>>
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
}



const FilterDialog = (props: FilterDialogProps) => {
    const { onClose, filterData, setFilterData, setShowFilter } = props

    function handleSelectOption(title: string, text: string) {
        setFilterData(filterData.map(fd => {
            return fd.title === title ?
                {
                    ...fd,
                    options: fd.options.map(op => {
                        return op.text === text ?
                            {
                                ...op,
                                selected: !op.selected
                            } : { ...op, selected: false }
                    })
                } : fd
        }))
        const element = filterData.find(fd => fd.title === title)
        if (element) {
            const option = element.options.find(o => o.text === text)
            if (option) {
                option.selected = !option.selected

            }
        }
    }


    return (
        <div className='fixed inset-0 md:relative'>
            <div className="z-50 static md:absolute w-full h-full md:h-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg h-full md:h-auto flex flex-col justify-between">
                    <div>
                        <div className='block md:hidden mb-6'>
                            <i onClick={() => setShowFilter(false)} className="fixed fa-solid fa-arrow-left fa-2x md:px-10 md:pt-10 mb-10 text-purple-500"></i>
                            <h2 className='text-2xl text-center'>Filters</h2>
                        </div>
                        {filterData.map(fd => {
                            return (
                                <div key={fd.title} className="mb-4">
                                    <h3 className="font-medium">{fd.title}</h3>
                                    <div className="flex justify-between mt-2">
                                        {fd.options.map(op => {
                                            return (
                                                <button key={op.text} onClick={() => handleSelectOption(fd.title, op.text)} className={`${op.selected ? 'bg-purple-100 text-purple-800' : 'bg-white'} w-1/3 h-10 m-3 rounded-lg border`}>{op.text}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <button className=" bottom-0 w-full bg-purple-600 text-white py-2 rounded-lg mt-4" onClick={() => onClose()}>Filter</button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default FilterDialog