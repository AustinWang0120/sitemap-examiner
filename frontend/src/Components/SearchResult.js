import React from 'react';

function SearchResult({ title, author, price }) {
  return (
    <div className='text-center'>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Price: {price}</p>
    </div>
  );
}

export default SearchResult;
