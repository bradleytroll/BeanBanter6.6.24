import React, { useState } from 'react';
import "../../src/index.css"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className='searchBar' onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input className='searchBar' 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a location"
      />
      <button className='searchButton' type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
