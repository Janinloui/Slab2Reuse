import { Table } from 'antd';
import { useTableStore } from '../state/tableStore';
import { ColumnTypeMap } from './columnTypes';
import { SettingsAndFilterPanel } from '../userView/SettingsAndFilterPanel';
import { useEffect, useRef, useState } from 'react';
import { getPartsWithUniqueType, reduceAndUseCount } from './attributeDefinition';
import { AddElement } from '../element/AddElement';
import { SlabType } from '../types/slabType';
import './table-style.css';

// Add function to find page number of selected part
const findPageForPart = (elementId: string, pageSize: number) => {
  const index = useTableStore.getState().elements.findIndex((part) => part.id === elementId);
  return index >= 0 ? Math.floor(index / pageSize) + 1 : 1;
};

const getRowClassName = (record: SlabType) => (useTableStore.getState().selectedElementIds.includes(record.id) ? 'bg-blue-300' : undefined);

//displaying the slab table with the columns based on the user category and attributes
export const SlabTable: React.FC = () => {
  const elements = useTableStore((s) => s.elements);
  const userCategory = useTableStore((s) => s.userCategory);
  const userAttributeMap = useTableStore((s) => s.userAttributeMap);
  const selectIds = useTableStore((s) => s.selectedElementIds);
  const [columns, setColumns] = useState(userAttributeMap[userCategory].map((s) => ColumnTypeMap[s]));

  // Add state for current page
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColumns(userAttributeMap[userCategory].map((s) => ColumnTypeMap[s]).filter((s) => s !== undefined)); // filtering out columns that are not defined, right now only for the rebound test data, which doesn't have a renderer in the tabel defined for it
  }, [userCategory, userAttributeMap]);

  useEffect(() => {
    console.log('Elements updated:', elements); // Debugging log
  }, [elements]);

  const onRowClick = (evt: React.MouseEvent, record: SlabType) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (useTableStore.getState().selectedElementIds.includes(record.id!)) useTableStore.getState().clearSelection();
    else useTableStore.getState().setSelectedElementIds(record.id!);
  };

  useEffect(() => {
    if (selectIds.length > 0) {
      // Find the page number for the first selected part
      let firstId = selectIds[0];
      let targetPage = 100000;
      for (const id of selectIds) {
        const localPage = findPageForPart(firstId, pageSize);
        if (localPage < targetPage) targetPage = localPage;
        firstId = id;
      }
      // Update the page
      setCurrentPage(targetPage);

      // Wait for the page change to complete before scrolling
      setTimeout(() => {
        if (tableRef.current) {
          const selectedRow = tableRef.current.querySelector('.bg-blue-300');
          if (selectedRow) {
            selectedRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }, 100);
    }
  }, [selectIds]);

  return (
    <>
      <SettingsAndFilterPanel />
      <Table
        size='small'
        pagination={{
          defaultPageSize: pageSize,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          onShowSizeChange: (_current, size) => setPageSize(size),
        }}
        onRow={(record) => {
          return {
            onClick: (evt) => {
              console.log(evt);
              onRowClick(evt, record as SlabType);
            },
          };
        }}
        sticky={{ offsetHeader: 50 }}
        rowClassName={getRowClassName as any}
        scroll={{ x: 1000 }}
        dataSource={reduceAndUseCount.includes(userCategory) ? getPartsWithUniqueType(elements) : elements}
        columns={columns}
        style={{ paddingTop: 45 }}
      />
      <AddElement />
    </>
  );
};
