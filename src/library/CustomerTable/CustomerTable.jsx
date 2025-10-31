import React from 'react';
import { FixedSizeList } from 'react-window/dist/react-window.js';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import './CustomerTable.css';

const ROW_HEIGHT = 65;

export default function CustomerTable({
  customers,
  totalCount,
  isLoading,
  loadMoreItems,
  sortConfig,
  onSortChange,
}) {
  const isItemLoaded = (index) => !!customers[index];

  const Row = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = <div className="row-loading">Loading...</div>;
    } else {
      content = <TableRow customer={customers[index]} />;
    }
    return <div style={style}>{content}</div>;
  };

  return (
    <div className="table-container">
      <TableHeader sortConfig={sortConfig} onSortChange={onSortChange} />
      <div className="table-body">
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
