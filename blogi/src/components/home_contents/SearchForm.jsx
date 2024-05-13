// SearchForm.js
import React from 'react';

function SearchForm() {
  return (
    <form id="searchForm" action="searched.php" method="GET">
      <input type="text" name="query" placeholder="Search blogs by heading" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
