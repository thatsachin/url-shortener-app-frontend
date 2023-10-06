import React from 'react'
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className='Error404'>
        <h1>Page Not Found</h1>
        <br />
        <button><Link to="/">Go Back</Link></button>
    </div>
  )
}

export default Error404
