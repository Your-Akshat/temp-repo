import React from 'react';
import CustomerInfo from './CustomerInfo';
import './CustomerTable.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export default function TableRow({ customer }) {
  return (
    <div className="table-row">
      <div className="table-cell cell-checkbox">
        <input type="checkbox" />
      </div>
      <div className="table-cell cell-expand">
        <button className="expand-button">+</button>
      </div>
      
      <div className="table-cell cell-customer">
        <CustomerInfo 
          avatar={customer.avatar} 
          name={customer.name} 
          phone={customer.phone} 
        />
      </div>
      
      <div className="table-cell cell-score">{customer.score}</div>
      <div className="table-cell cell-email">{customer.email}</div>
      <div className="table-cell cell-filter">-</div> 
      <div className="table-cell cell-filter">-</div> 
      
      <div className="table-cell cell-last-message">
        {formatDate(customer.lastMessageAt)}
      </div>
      
      <div className="table-cell cell-added-by">{customer.addedBy}</div>
    </div>
  );
}