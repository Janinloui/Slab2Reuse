import { Table } from 'antd';
import { DatabaseObjectType, DatabaseObjectValue } from '../types/databaseObjectType';
import { BuildingType } from '../types/buildingType';
import { BuildingKeyType } from '../enums/buildingKeyType';
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
import { DatabaseValueArrayMap } from '../types/databaseType';
import { ComponentType } from '../types/componentType';
import { getColumTypeForEnums } from './lib/getColumTypeForEnums';

/**
 * Helper method to get a column defintion for the DatabaseObjectType
 * @param type - DatabaseObjectValue U
 * @returns Record<keyof U, ColumnType<Partial<U>>>
 */
const genericColumnGenerator = (type: DatabaseObjectValue) => {
  switch (type) {
    case 'BuildingType':
      return getColumTypeForEnums<BuildingType>(Object.values(BuildingKeyType));
    case 'UserType':
      return getColumTypeForEnums<UserType>(Object.values(UserKeyType));
    case 'ComponentType':
      return getColumTypeForEnums<ComponentType>(Object.values(ComponentKeyType));
    case 'GeometryType':
      return getColumTypeForEnums<GeometryType>(Object.values(GeometryKeyType) as any); // these components have a variable amount of entries, because of that the type isn't 1-1
    case 'CrossSectionType':
      return getColumTypeForEnums<CrossSectionType>(Object.values(CrossSectionKeyType));
    case 'MaterialType':
      return getColumTypeForEnums<MaterialType>(Object.values(MaterialKeyType) as any); // these components have a variable amount of entries, because of that the type isn't 1-1
    case 'RebarType':
      return getColumTypeForEnums<RebarType>(Object.values(RebarKeyType) as any); // these components have a variable amount of entries, because of that the type isn't 1-1
  }
};

const isCollectionName = (name: string): boolean => Object.values(CollectionName).includes(name as CollectionName);

const GenericTable: React.FC<{ type: DatabaseObjectValue; objects: DatabaseObjectType[] }> = ({ type, objects }) => (
  <Table
    dataSource={objects.map((o, key) => ({ ...o, key }))}
    columns={Object.values(genericColumnGenerator(type)) as any}
  ></Table>
);

/**
 * Component that renders a table for a given collection, set by the URL params.
 */
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
