import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
    return (
        <div>
            <form className='flex items-center gap-2'>
                <input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
                <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                    <IoSearchSharp/>
                </button>
            </form>
        </div>
    )
}

export default SearchInput