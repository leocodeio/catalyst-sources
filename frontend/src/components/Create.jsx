import React from 'react'
import { Link } from 'react-router-dom'

const Create = () => {
  return (
    <div>
      <div className="links">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/search">Search</Link>
      </div>
      This page is to create blogs!!!
    </div>
  )
}

export default Create
