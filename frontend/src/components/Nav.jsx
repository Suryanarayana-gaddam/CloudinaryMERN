import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    const [uploadStyle,setUploadStyle] = useState(false);
    const [detailsStyle,setDetailsStyle] = useState(false);

    const handleUploadStyle = () =>{
        setUploadStyle(true);
        setDetailsStyle(false);
    }
    const handleDetailsStyle = () =>{
        setUploadStyle(false);
        setDetailsStyle(true);
    }
  return (
    <div className='bg-amber-200 flex place-items-center justify-around h-14'>
      <div className={`text-green-500 text-xl hover:text-blue-600 ${uploadStyle ? "underline text-2xl font-bold" : ""}`}><Link to="/" onClick={handleUploadStyle}>Upload</Link></div>
      <div className={`text-green-500 text-xl hover:text-blue-600 ${detailsStyle ? "underline text-2xl font-bold" : ""}`}><Link to="/display/details" onClick={handleDetailsStyle}>View Details</Link></div>
    </div>
  )
}

export default Nav
