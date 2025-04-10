import { CollectionName } from '../enums/collectionName';
import { BuildingType } from './buildingType';
import { ComponentType } from './componentType';
import { CrossSectionType } from './crossSectionType';
import { GeometryType } from './geometryType';
import { MaterialType } from './materialType';
import { RebarType } from './rebarType';
import { UserType } from './userType';
import { ValueType } from './valueType';

export type DatabaseType = {
  [CollectionName.Buildings]: BuildingType[];
  [CollectionName.Users]: UserType[];
  [CollectionName.Components]: ComponentType[];
  [CollectionName.Geometries]: GeometryType[];
  [CollectionName.CrossSections]: CrossSectionType[];
  [CollectionName.Materials]: MaterialType[];
  [CollectionName.Rebars]: RebarType[];
};

export const DatabaseValueArrayMap: Record<CollectionName, ValueType> = {
  [CollectionName.Buildings]: 'BuildingTypeArray',
  [CollectionName.Users]: 'UserTypeArray',
  [CollectionName.Components]: 'ComponentTypeArray',
  [CollectionName.Geometries]: 'GeometryTypeArray',
  [CollectionName.CrossSections]: 'CrossSectionTypeArray',
  [CollectionName.Materials]: 'MaterialTypeArray',
  [CollectionName.Rebars]: 'RebarTypeArray'
}
