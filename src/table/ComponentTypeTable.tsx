import { Table } from 'antd';
import { CollectionName } from '../enums/collectionName';
import { useCollectionStore } from '../state/collectionStore';
import { getColumnsForComponentKeys } from './lib/getComponentColumnDefinition';
import { ComponentDerivedAttributes } from '../enums/componentDerivedAttributes';
import { ComponentKeyType } from '../enums/componentKeyType';

export const ComponentTypeTable: React.FC<{
  keys: (ComponentDerivedAttributes | ComponentKeyType)[];
  canChange?: boolean;
}> = ({ keys, canChange = false }) => {
  const collections = useCollectionStore((s) => s.collections);

  return (
    <Table
      columns={getColumnsForComponentKeys(keys, canChange)}
      dataSource={collections[CollectionName.Components].map((e, key) => ({ ...e, key }))}
    />
  );
};
