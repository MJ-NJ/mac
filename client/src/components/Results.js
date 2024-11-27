import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:15007/getInfo')
      .then((response) => {
        setResults(response.data); 
        setFilteredResults([]);
        // setFilteredResults(response.data); -- dont wanna show all results pehele se hi
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    if (query.trim() === '') { 
      setFilteredResults([]); 
    } else {
    const filtered = results.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  }};
  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results-section">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <div className="result-item">
              <p>Name: {result.name}</p>
              <p>Age: {result.age}</p>
              <p>Gender: {result.gender}</p>
              {result.finalResult && <p>Result: {result.finalResult}</p>}
              <p>File Name: {result.fileName}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;