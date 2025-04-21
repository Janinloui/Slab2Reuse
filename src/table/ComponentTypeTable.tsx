import { Table } from 'antd';
import { CollectionName } from '../enums/collectionName';
import { useCollectionStore } from '../state/collectionStore';
import { getColumnsForComponentKeys } from './lib/getComponentColumnDefinition';
import { ComponentDerivedAttributes } from '../enums/componentDerivedAttributes';
import { ComponentKeyType } from '../enums/componentKeyType';
import { MultiTestKeysType } from '../types/dataOfTestsForGeometryType';
import { useEffect } from 'react';
import { getMappedData } from '../lib/parsingOldData';
import { exampleData } from '../state/exampleData';

export const ComponentTypeTable: React.FC<{
  keys: (ComponentDerivedAttributes | ComponentKeyType | MultiTestKeysType)[];
  canChange?: boolean;
  height?: number;
}> = ({ keys, canChange = false, height }) => {
  const collections = useCollectionStore((s) => s.collections);

  // loading in the example data
  useEffect(() => useCollectionStore.getState()._setCollections(getMappedData(exampleData)), []);

  return (
    <Table
      size='small'
      columns={getColumnsForComponentKeys(keys, canChange)}
      dataSource={collections[CollectionName.Components].map((e, key) => ({ ...e, key }))}
      scroll={{ x: 'max-content', y: height ?? window.innerHeight - 120 }}
    />
  );
};
