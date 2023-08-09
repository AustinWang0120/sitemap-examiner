import React, { useState } from 'react';
import axios from 'axios';
import SearchInput from '../Components/SearchInput.js';
import SearchResult from '../Components/SearchResult.js';
import Loading from '../Components/Loading.js';

function SearchContainer() {
  const [sku, setSku] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setResult(null);
    setIsLoading(true);
    axios.get(`http://localhost:3001/search?sku=${sku}`).then(response => {
      setResult(response.data);
      setIsLoading(false);
    });
  };

  return (
    <div>
      <SearchInput sku={sku} setSku={setSku} handleSearch={handleSearch} />
      <div className='d-flex flex-column align-items-center'>
        {isLoading && <Loading />}
        {result && <SearchResult {...result} />}
      </div>
    </div>
  );
}

export default SearchContainer;
