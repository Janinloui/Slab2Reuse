import { Table } from 'antd';
import { useTableStore } from '../state/tableStore';
import { ColumnTypeMap } from './columnTypes';
import { SettingsAndFilterPanel } from '../userView/SettingsAndFilterPanel';
import { useEffect, useState } from 'react';
import { getPartsWithUniqueType, reduceAndUseCount } from './attributeDefinition';
import { AddElement } from '../element/AddElement';
//displaying the slab table with the columns based on the user category and attributes
export const SlabTable: React.FC = () => {
  const elements = useTableStore((s) => s.elements);
  const userCategory = useTableStore((s) => s.userCategory);
  const userAttributeMap = useTableStore((s) => s.userAttributeMap);
  const [columns, setColumns] = useState(userAttributeMap[userCategory].map((s) => ColumnTypeMap[s]));

  useEffect(() => {
    setColumns(userAttributeMap[userCategory].map((s) => ColumnTypeMap[s]).filter((s) => s !== undefined)); // filtering out columns that are not defined, right now only for the rebound test data, which doesn't have a renderer in the tabel defined for it
  }, [userCategory, userAttributeMap]);

  useEffect(() => {
    console.log('Elements updated:', elements); // Debugging log
  }, [elements]);

  return (
    <>
      <SettingsAndFilterPanel />
      <Table
        size='small'
        sticky={{ offsetHeader: 50 }}
        scroll={{ x: 1000 }}
        dataSource={reduceAndUseCount.includes(userCategory) ? getPartsWithUniqueType(elements) : elements}
        columns={columns}
        style={{ paddingTop: 45 }}
      />
      <AddElement />
    </>
  );
};
