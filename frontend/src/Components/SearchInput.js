import React from 'react';

function SearchInput({ sku, setSku, handleSearch }) {
  return (
    <div className='input-group mb-3'>
      <input
        type='text'
        className='form-control'
        placeholder='Enter SKU'
        value={sku}
        onChange={e => setSku(e.target.value)}
      />
      <button className='btn btn-primary' onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;
