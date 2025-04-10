import { Table } from 'antd';
import { DatabaseObjectType, DatabaseObjectValue } from '../types/databaseObjectType';
import { ColumnType } from 'antd/es/table';
import { BuildingType } from '../types/buildingType';
import { BuildingKeyType } from '../enums/buildingKeyType';
import { EntryRenderer } from '../generic/GenericUIRenderer';
import { AllKeyMap } from '../types/allKeyMap';
import { ComponentKeyType } from '../enums/componentKeyType';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { MaterialKeyType } from '../enums/materialKeyType';
import { RebarKeyType } from '../enums/rebarKeyType';
import { UserKeyType } from '../enums/userKeyType';
import { CrossSectionType } from '../types/crossSectionType';
import { GeometryType } from '../types/geometryType';
import { MaterialType } from '../types/materialType';
import { RebarType } from '../types/rebarType';
import { UserType } from '../types/userType';
import { useParams } from 'react-router-dom';
import { useCollectionStore } from '../state/collectionStore';
import { CollectionName } from '../enums/collectionName';
import { DatabaseValueArrayMap } from '../types/databseType';
import { ComponentType } from '../types/componentType';

const getColumnTypeForKey = <U extends Record<string, any>>(k: keyof U): ColumnType<Partial<U>> => ({
  title: k as string,
  dataIndex: k as string,
  render: (_, r) =>
    r[k] !== undefined ? <EntryRenderer k={k as string} valueType={AllKeyMap[k]} value={r[k]} /> : null
});

const getColumTypeFoEnums = <U extends Record<string, any>>(keys: (keyof U)[]) =>
  Object.fromEntries(keys.map((k) => [k, getColumnTypeForKey<U>(k)])) as Record<keyof U, ColumnType<Partial<U>>>;

const genericColumnGenerator = (type: DatabaseObjectValue) => {
  switch (type) {
    case 'BuildingType':
      return getColumTypeFoEnums<BuildingType>(Object.values(BuildingKeyType));
    case 'UserType':
      return getColumTypeFoEnums<UserType>(Object.values(UserKeyType));
    case 'ComponentType':
      return getColumTypeFoEnums<ComponentType>(Object.values(ComponentKeyType));
    case 'GeometryType':
      return getColumTypeFoEnums<GeometryType>(Object.values(GeometryKeyType) as any); // these components have a variable amount of entries
    case 'CrossSectionType':
      return getColumTypeFoEnums<CrossSectionType>(Object.values(CrossSectionKeyType));
    case 'MaterialType':
      return getColumTypeFoEnums<MaterialType>(Object.values(MaterialKeyType) as any); // these components have a variable amount of entries
    case 'RebarType':
      return getColumTypeFoEnums<RebarType>(Object.values(RebarKeyType) as any); // these components have a variable amount of entries
  }
};

const isCollectionName = (name: string): boolean => Object.values(CollectionName).includes(name as CollectionName);

const GenericTable: React.FC<{ type: DatabaseObjectValue; objects: DatabaseObjectType[] }> = ({ type, objects }) => (
  <Table dataSource={objects} columns={Object.values(genericColumnGenerator(type)) as any}></Table>
);

export const GenericTableEntry: React.FC = () => {
  const { collectionName } = useParams();
  const collections = useCollectionStore((state) => state.collections);

  return collectionName && isCollectionName(collectionName) ? (
    <GenericTable
      type={DatabaseValueArrayMap[collectionName as CollectionName].replace('Array', '') as DatabaseObjectValue}
      objects={collections[collectionName as CollectionName] as DatabaseObjectType[]}
    />
  ) : (
    <div>{`"${collectionName}" is not a valid collection name`}</div>
  );
};
