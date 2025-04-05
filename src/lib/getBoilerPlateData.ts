import { ComponentType } from 'react';
import { BuildingKeyType } from '../enums/buildingKeyType';
import { ChemicalTestKeyType } from '../enums/chemicalTestKeyType';
import { ComponentCategory } from '../enums/componentCategory';
import { ComponentKeyType } from '../enums/componentKeyType';
import { CoreTestKeyType } from '../enums/coreTestKeyType';
import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { DestructiveTestKeyType } from '../enums/destructiveTestKeyType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { GPRTestKeyType } from '../enums/gprTestKeyType';
import { LocationKeyType } from '../enums/locationKeyType';
import { MaterialCategory } from '../enums/materialCategory';
import { MaterialKeyType } from '../enums/materialKeyType';
import { PreStressStrandKeyType } from '../enums/preStressStrandKeyType';
import { RebarCategory } from '../enums/rebarCategory';
import { RebarKeyType } from '../enums/rebarKeyType';
import { UserKeyType } from '../enums/userKeyType';
import { BuildingType, BuildingValueMap } from '../types/buildingType';
import { ChemicalTestType, ChemicalTestValueMap } from '../types/chemicalTestType';
import { CoreTestType, CoreTestValueMap } from '../types/coreTestType';
import { CrossSectionType, CrossSectionValueMap } from '../types/crossSectionType';
import { DestructiveTestType, DestructiveTestValueMap } from '../types/destructiveTestType';
import { GeometryType, GeometryValueMap } from '../types/geometryType';
import { GPRTestType, GPRTestValueMap } from '../types/gprTestType';
import { LocationType, LocationValueMap } from '../types/locationType';
import { MaterialType, MaterialValueMap } from '../types/materialType';
import { PreStressStrandType, PreStressStrandValueMap } from '../types/preStressStrandType';
import { RebarEntry, RebarType, RebarValueMap } from '../types/rebarType';
import { ReboundTestType, ReboundTestValueMap } from '../types/reboundTestType';
import { UserType, UserValueMap } from '../types/userType';
import { ValueType } from '../types/valueType';
import { ReboundTestKeyType } from '../enums/reboundTestKeyType';
import { ComponentValueMap } from '../types/componentType';
import { VisualInspectionType, VisualInspectionValueMap } from '../types/visualInspectionType';
import { VisualInspectionKeyType } from '../enums/visualInspectionKeyType';
import { UserCategory } from '../enums/userCategory';

const getRandomNumberArray = (length: number, min: number, max: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * (max - min)) + min);
const getStringForKey = (k?: string) => {
  switch (k) {
    case MaterialKeyType.Id:
      return `Ma-${btoa(Math.random().toString(36))}`;
    case BuildingKeyType.Id:
      return `Bu-${btoa(Math.random().toString(36))}`;
    case ComponentKeyType.Id:
      return `Ct-${btoa(Math.random().toString(36))}`;
    case CrossSectionKeyType.Id:
      return `Cx-${btoa(Math.random().toString(36))}`;
    case UserKeyType.Id:
      return `Us-${btoa(Math.random().toString(36))}`;
    case GeometryKeyType.Id:
      return `Ge-${btoa(Math.random().toString(36))}`;
    case 'id':
    default:
      return btoa(Math.random().toString(36));
  }
};

const getRandomNestedNumeberArray = (length: number, min: number, max: number) =>
  Array.from({ length }, () => getRandomNumberArray(length, min, max));

const normalCaseValueMapCast = <T, U extends string>(valueMap: Record<U, ValueType>) =>
  Object.fromEntries(
    Object.entries(valueMap).map(([k, valueType]) => [k, getBoilerPlateDataForValyeType(valueType as ValueType)])
  ) as T;

export const getBoilerPlateDataForValyeType = (t: ValueType, k?: string): any => {
  switch (t) {
    case 'number':
      return 0;
    case 'string':
      return getStringForKey(k);
    case 'LocationType':
      return normalCaseValueMapCast<LocationType, LocationKeyType>(LocationValueMap);
    case 'numberArray':
      return getRandomNumberArray(5, 0, 100);
    case 'numberArrayArray':
      return getRandomNestedNumeberArray(5, 0, 100);
    case 'stringPairArray':
      return ['string', 'string'];
    case 'UserCategory':
      return UserCategory.Individual;
    case 'MaterialCategory':
      return MaterialCategory.Concrete;
    case 'CrossSectionCategory':
      return CrossSectionCategory.HollowCore;
    case 'ComponentCategory':
      return ComponentCategory.Slab;
    case 'RebarCategory':
      return RebarCategory.Homogeneus;
    case 'RebarType':
      return normalCaseValueMapCast<RebarType, RebarKeyType>(RebarValueMap);
    case 'RebarEntryArray':
      return [{ [RebarKeyType.RebarDiameter]: 12, [RebarKeyType.RebarAmount]: 20 }] as RebarEntry[];
    case 'PreStressStrandType':
      return normalCaseValueMapCast<PreStressStrandType, PreStressStrandKeyType>(PreStressStrandValueMap);
    case 'VisualInspectionType':
      return normalCaseValueMapCast<VisualInspectionType, VisualInspectionKeyType>(VisualInspectionValueMap);
    case 'VisualInspectionTypeArray':
      return [getBoilerPlateDataForValyeType('VisualInspectionType')];
    case 'DestructiveTestType':
      return normalCaseValueMapCast<DestructiveTestType, DestructiveTestKeyType>(DestructiveTestValueMap);
    case 'CoreTestType':
      return normalCaseValueMapCast<CoreTestType, CoreTestKeyType>(CoreTestValueMap);
    case 'ChemicalTestType':
      return normalCaseValueMapCast<ChemicalTestType, ChemicalTestKeyType>(ChemicalTestValueMap);
    case 'GPRTestType':
      return normalCaseValueMapCast<GPRTestType, GPRTestKeyType>(GPRTestValueMap);
    case 'ReboundTestType':
      return normalCaseValueMapCast<ReboundTestType, ReboundTestKeyType>(ReboundTestValueMap);
    case 'BuildingType':
      return normalCaseValueMapCast<BuildingType, BuildingKeyType>(BuildingValueMap);
    case 'BuildingTypeArray':
      return [getBoilerPlateDataForValyeType('BuildingType')]
    case 'UserType':
      return normalCaseValueMapCast<UserType, UserKeyType>(UserValueMap);
    case 'UserTypeArray':
      return [getBoilerPlateDataForValyeType('UserType')]
    case 'ComponentType':
      return normalCaseValueMapCast<ComponentType, ComponentKeyType>(ComponentValueMap);
    case 'ComponentTypeArray':
      return [getBoilerPlateDataForValyeType('ComponentType')]
    case 'GeometryType':
      return normalCaseValueMapCast<GeometryType, GeometryKeyType>(GeometryValueMap);
    case 'GeometryTypeArray':
      return [getBoilerPlateDataForValyeType('GeometryType')]
    case 'CrossSectionType':
      return normalCaseValueMapCast<CrossSectionType, CrossSectionKeyType>(CrossSectionValueMap);
    case 'CrossSectionTypeArray':
      return [getBoilerPlateDataForValyeType('CrossSectionType')]
    case 'MaterialType':
      return normalCaseValueMapCast<MaterialType, MaterialKeyType>(MaterialValueMap);
    case 'MaterialTypeArray':
      return [getBoilerPlateDataForValyeType('MaterialType')]
    case 'RebarType':
      return normalCaseValueMapCast<RebarType, RebarKeyType>(RebarValueMap);
    case 'RebarTypeArray':
      return [getBoilerPlateDataForValyeType('RebarType')]
  }
};
