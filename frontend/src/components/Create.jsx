import React from 'react'
import { Link } from 'react-router-dom'

const Create = () => {
  return (
    <div>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </div>
      This page is to create blogs!!!
    </div>
  )
}

export default Create
