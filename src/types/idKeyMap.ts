import { BuildingKeyType } from '../enums/buildingKeyType';
import { CollectionName } from '../enums/collectionName';
import { ComponentKeyType } from '../enums/componentKeyType';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { MaterialKeyType } from '../enums/materialKeyType';
import { RebarKeyType } from '../enums/rebarKeyType';

export const IdKeys = [
  BuildingKeyType.OwnerId,
  ComponentKeyType.BuildingId,
  ComponentKeyType.GeometryTypeId,
  ComponentKeyType.ManufacturerId,
  CrossSectionKeyType.RebarTypeId,
  CrossSectionKeyType.ConcreteMaterialTypeId,
  GeometryKeyType.CrossSectionId,
  GeometryKeyType.OriginalGeometryId,
  MaterialKeyType.CrossSectionId,
  RebarKeyType.RebarMaterialId,
  'componentId'
] as const;

export type IdKeysType = (typeof IdKeys)[number];

export const IdKeysCollectionMap: Record<IdKeysType, CollectionName> = {
  [BuildingKeyType.OwnerId]: CollectionName.Users,
  [ComponentKeyType.BuildingId]: CollectionName.Buildings,
  [ComponentKeyType.GeometryTypeId]: CollectionName.Geometries,
  [ComponentKeyType.ManufacturerId]: CollectionName.Users,
  [CrossSectionKeyType.RebarTypeId]: CollectionName.Rebars,
  [CrossSectionKeyType.ConcreteMaterialTypeId]: CollectionName.Materials,
  [GeometryKeyType.CrossSectionId]: CollectionName.CrossSections,
  [GeometryKeyType.OriginalGeometryId]: CollectionName.Geometries,
  [MaterialKeyType.CrossSectionId]: CollectionName.CrossSections,
  [RebarKeyType.RebarMaterialId]: CollectionName.Rebars,
  componentId: CollectionName.Components
};
