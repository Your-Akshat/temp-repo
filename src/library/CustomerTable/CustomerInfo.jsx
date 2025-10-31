import React from 'react';
import './CustomerTable.css';

export default function CustomerInfo({ avatar, name, phone }) {
  return (
    <div className="customer-info">
      <img src={avatar} alt="avatar" className="customer-avatar" />
      <div className="customer-details">
        <div className="customer-name">{name}</div>
        <div className="customer-phone">{phone}</div>
      </div>
    </div>
  );
}