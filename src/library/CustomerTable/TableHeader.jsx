// src/components/TableHeader.js
import React from 'react';
import './CustomerTable.css'; // We'll share CSS with TableRow

// Sort arrow component
const SortArrow = ({ direction }) => {
  if (direction === 'asc') return <span>&nbsp;▲</span>;
  if (direction === 'desc') return <span>&nbsp;▼</span>;
  return null;
};

export default function TableHeader({ sortConfig, onSortChange }) {
  
  const handleHeaderClick = (key) => {
    // Only allow sorting on specific columns
    const sortableKeys = ['name', 'score', 'lastMessageAt', 'addedBy'];
    if (sortableKeys.includes(key)) {
      onSortChange(key);
    }
  };

  return (
    <div className="table-header table-row"> {/* Share 'table-row' styles */}
      {/* These 'table-cell' divs must match the widths in TableRow.js */}
      <div className="table-cell cell-checkbox">
        <input type="checkbox" />
      </div>
      <div className="table-cell cell-expand">
        <button className="expand-button" disabled></button>
      </div>
      
      <div 
        className="table-cell cell-customer"
        onClick={() => handleHeaderClick('name')}
      >
        Customer
        {sortConfig.key === 'name' && <SortArrow direction={sortConfig.direction} />}
      </div>
      
      {/* These names are from the 'db.js' schema */}
      <div className="table-cell cell-score" onClick={() => handleHeaderClick('score')}>
        Filter 1
        {sortConfig.key === 'score' && <SortArrow direction={sortConfig.direction} />}
      </div>
      <div className="table-cell cell-email">Filter 2</div>
      <div className="table-cell cell-filter">Filter 3</div>
      <div className="table-cell cell-filter">Filter 4</div>
      
      <div 
        className="table-cell cell-last-message"
        onClick={() => handleHeaderClick('lastMessageAt')}
      >
        Last message sent at
        {sortConfig.key === 'lastMessageAt' && <SortArrow direction={sortConfig.direction} />}
      </div>
      
      <div 
        className="table-cell cell-added-by"
        onClick={() => handleHeaderClick('addedBy')}
      >
        Added by
        {sortConfig.key === 'addedBy' && <SortArrow direction={sortConfig.direction} />}
      </div>
    </div>
  );
}