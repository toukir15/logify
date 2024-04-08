import React from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'

export default function Pagination({ paginationData }) {
    console.log(paginationData)
    const { totalButtonArray, currentPage, setCurrentPage } = paginationData || {}
    const handlePageNoIncrement = () => {
        if (currentPage <= (totalButtonArray.length - 1)) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePageNoDecrement = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    return (
        <div className="flex  gap-2 justify-end text-primary">
            <div onClick={handlePageNoDecrement} className="border border-primary flex justify-center items-center w-9  h-9 hover:bg-primary hover:text-white transition duration-100 cursor-pointer rounded-full">
                <IoChevronBackOutline size={20} />
            </div>
            {
                totalButtonArray.map(num => {
                    return (
                        <div onClick={() => setCurrentPage(num + 1)} className={`border border-primary flex justify-center items-center w-9  h-9 hover:bg-primary hover:text-white transition duration-100 cursor-pointer rounded-full ${num + 1 == currentPage && "bg-primary text-white"}`}>
                            <p>{num + 1}</p>
                        </div>
                    )
                })
            }
            <div onClick={handlePageNoIncrement} className="border border-primary flex justify-center items-center w-9  h-9 hover:bg-primary hover:text-white transition duration-100 cursor-pointer rounded-full rotate-180">
                <IoChevronBackOutline size={20} />
            </div>
        </div>
    )
}