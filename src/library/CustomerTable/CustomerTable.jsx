// src/components/CustomerTable.js
import React from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer'; // Use this to fill space
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import './CustomerTable.css';

// A fixed row height is required by react-window
const ROW_HEIGHT = 65; 

export default function CustomerTable({
  customers,
  totalCount,
  isLoading,
  loadMoreItems,
  sortConfig,
  onSortChange,
}) {
  
  // This function tells the loader if a row's data is loaded
  const isItemLoaded = (index) => !!customers[index];

  // This component passes the `style` prop to our TableRow
  const Row = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = <div className="row-loading">Loading...</div>;
    } else {
      content = <TableRow customer={customers[index]} />;
    }
    
    // Apply the style from react-window (handles positioning)
    return <div style={style}>{content}</div>;
  };

  return (
    <div className="table-container">
      {/* 1. The Sticky Header */}
      <TableHeader sortConfig={sortConfig} onSortChange={onSortChange} />

      {/* 2. The Virtualized List */}
      <div className="table-body">
        {/* AutoSizer makes the list fill the available space */}
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={totalCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={totalCount}
                  itemSize={ROW_HEIGHT}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {Row}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}