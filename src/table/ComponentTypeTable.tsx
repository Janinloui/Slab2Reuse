import { Select, Table } from 'antd';
import { CollectionName } from '../enums/collectionName';
import { useCollectionStore } from '../state/collectionStore';
import { getColumnsForComponentKeys } from './lib/getComponentColumnDefinition';
import { useEffect } from 'react';
import { getMappedData } from '../lib/parsingOldData';
import { exampleData } from '../state/exampleData';
import { useTableStore } from '../state/tableStore';
import { NamedViews } from '../enums/viewer';

export const ComponentTypeTable: React.FC<{
  canChange?: boolean;
  height?: number;
}> = ({ canChange = false, height }) => {
  const collections = useCollectionStore((s) => s.collections);
  const viewer = useTableStore((s) => s.viewer);
  const viewerAttributeMap = useTableStore((s) => s.viewerAttributeMap);

  // loading in the example data
  useEffect(() => useCollectionStore.getState()._setCollections(getMappedData(exampleData)), []);

  return (
    <div>
      <span>
        <Select value={viewer} onChange={(e) => useTableStore.getState().setViewer(e)}>
          {Object.values(NamedViews).map((e) => (
            <Select.Option key={e} value={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
      </span>
      <Table
        size='small'
        columns={getColumnsForComponentKeys(viewerAttributeMap[viewer], canChange)}
        dataSource={collections[CollectionName.Components].map((e, key) => ({ ...e, key }))}
        scroll={{ x: 'max-content', y: height ?? window.innerHeight - 120 }}
      />
    </div>
  );
};
