import React from 'react'
import { BiSolidErrorAlt } from "react-icons/bi";

const PageNotFound = () => {
  return (
    <>
        <div className='m-auto mt-40 text-center text-sm font-semibold'>
            <BiSolidErrorAlt className='w-full size-64 p-4 text-center' />
            <p className='text-md font-semibold'>404 Page Not Found or Invalid URL</p>
        </div>
    </>
  )
}

export default PageNotFound