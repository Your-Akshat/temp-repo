import React, { useState } from 'react';
import './CustomerListToolbar.css';

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.33333 11.6667H9.66667V10H6.33333V11.6667ZM0.333334 2.33333V4H15.6667V2.33333H0.333334ZM3 8H13V6.33333H3V8Z" fill="#6B7280"/>
  </svg>
);

export default function CustomerListToolbar({ totalCount, searchTerm, onSearchChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="toolbar-container">
      <h2 className="toolbar-title">
        All Customers
        <span className="customer-count-chip">{totalCount}</span>
      </h2>
      
      <div className="toolbar-controls">
        <div className="search-bar">
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