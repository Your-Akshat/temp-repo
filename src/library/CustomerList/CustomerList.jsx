// src/components/CustomerList.js
import React, { useState, useEffect, useCallback } from 'react';
import CustomerListToolbar from '../CustomerListToolbar/CustomerListToolbar';
import CustomerTable from '../CustomerTable/CustomerTable';
import { getCustomers, getCustomerCount } from '../../data/api';
import { debounce } from 'lodash';
import './CustomerList.css';

// A simple hook to debounce input
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};


export default function CustomerList({ isDbReady }) {
  const [customers, setCustomers] = useState({}); // Use an object as a cache
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // State for search and sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  
  const debouncedSearchTerm = debounce(searchTerm, 250);

  // This function fetches the total count
  const fetchCount = useCallback(async () => {
    const count = await getCustomerCount({ searchTerm: debouncedSearchTerm });
    setTotalCount(count);
  }, [debouncedSearchTerm]);

  // Reset/refetch all data when search or sort changes
  useEffect(() => {
    if (!isDbReady) return;
    
    setIsLoading(true);
    setCustomers({}); // Clear cache on new search/sort
    fetchCount();
    
    // Fetch the first page immediately
    loadMoreItems(0, 30); 
    
  }, [isDbReady, debouncedSearchTerm, sortConfig, fetchCount]);

  // This is the core function for the infinite loader
  const loadMoreItems = useCallback(async (startIndex, stopIndex) => {
    setIsLoading(true);
    const limit = stopIndex - startIndex + 1;
    const page = Math.floor(startIndex / limit);

    console.log(`Fetching items: ${startIndex} to ${stopIndex}`);
    
    const data = await getCustomers({
      page: page,
      limit: limit,
      sortConfig: sortConfig,
      searchTerm: debouncedSearchTerm,
    });

    // Update the cache with new data
    setCustomers(prev => {
      const newCustomers = { ...prev };
      data.forEach((customer, index) => {
        newCustomers[startIndex + index] = customer;
      });
      return newCustomers;
    });
    
    setIsLoading(false);
  }, [debouncedSearchTerm, sortConfig]);

  // Sort handler
  const handleSort = (key) => {
    setSortConfig(prev => {
      const direction = prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  if (!isDbReady) {
    return <div>Preparing database...</div>;
  }

  return (
    <div className="customer-list-container">
      <CustomerListToolbar
        totalCount={totalCount}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />
      <CustomerTable
        customers={customers}
        totalCount={totalCount}
        isLoading={isLoading}
        loadMoreItems={loadMoreItems}
        sortConfig={sortConfig}
        onSortChange={handleSort}
      />
    </div>
  );
}