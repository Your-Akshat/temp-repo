// src/components/CustomerListToolbar.js
import React, { useState } from 'react';
import './CustomerListToolbar.css';

// You can use an SVG icon library, but for no-deps:
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.9382 13 9.2673 12.5329 10.3439 11.7422L14.2929 15.6911C14.6834 16.0816 15.3166 16.0816 15.7071 15.6911C16.0976 15.3006 16.0976 14.6674 15.7071 14.2769L11.7422 10.3439ZM11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5Z" fill="#6B7280"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.33333 11.6667H9.66667V10H6.33333V11.6667ZM0.333334 2.33333V4H15.6667V2.33333H0.333334ZM3 8H13V6.33333H3V8Z" fill="#6B7280"/>
  </svg>
);

export default function CustomerListToolbar({ totalCount, searchTerm, onSearchChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="toolbar-container">
      {/* This is the "All Customers 1230" header from your screenshot */}
      <h2 className="toolbar-title">
        All Customers
        <span className="customer-count-chip">{totalCount}</span>
      </h2>
      
      {/* This is the Search + Filter row */}
      <div className="toolbar-controls">
        <div className="search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search Customers"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <div className="filter-dropdown-container">
          <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <FilterIcon />
            Add Filters
          </button>
          
          {/* Dummy Filters Dropdown */}
          {isFilterOpen && (
            <div className="filter-dropdown">
              <div>Filter 1</div>
              <div>Filter 2</div>
              <div>Filter 3</div>
              <div>Filter 4</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}