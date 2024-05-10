import React from 'react'

export const SearchHeader = ({handleSearch}) => {
  return (
    <>
    <div className='container'>
    <div className='header'>
        <h1> RoboFriends</h1>
    </div>
    <div className='search'>
        <input type='text' placeholder='Search the name' onChange={handleSearch} />
        <hr></hr>
    </div>
    
    </div>
    </>
  )
}
