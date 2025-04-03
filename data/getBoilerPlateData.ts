import { ComponentType } from 'react';
import { BuildingKeyType } from '../src/enums/buildingKeyType';
import { ChemicalTestKeyType } from '../src/enums/chemicalTestKeyType';
import { ComponentCategory } from '../src/enums/componentCategory';
import { ComponentKeyType } from '../src/enums/componentKeyType';
import { CoreTestKeyType } from '../src/enums/coreTestKeyType';
import { CrossSectionCategory } from '../src/enums/crossSectionCategory';
import { CrossSectionKeyType } from '../src/enums/crossSectionKeyType';
import { DestructiveTestKeyType } from '../src/enums/destructiveTestKeyType';
import { GeometryKeyType } from '../src/enums/geometryKeyType';
import { GPRTestKeyType } from '../src/enums/gprTestKeyType';
import { LocationKeyType } from '../src/enums/locationKeyType';
import { MaterialCategory } from '../src/enums/materialCategory';
import { MaterialKeyType } from '../src/enums/materialKeyType';
import { PreStressStrandKeyType } from '../src/enums/preStressStrandKeyType';
import { RebarCategory } from '../src/enums/rebarCategory';
import { RebarKeyType } from '../src/enums/rebarKeyType';
import { UserCategory } from '../src/enums/userCategory';
import { UserKeyType } from '../src/enums/userKeyType';
import { BuildingType, BuildingValueMap } from '../src/types/buildingType';
import { ChemicalTestType, ChemicalTestValueMap } from '../src/types/chemicalTestType';
import { CoreTestType, CoreTestValueMap } from '../src/types/coreTestType';
import { CrossSectionType, CrossSectionValueMap } from '../src/types/crossSectionType';
import { DestructiveTestType, DestructiveTestValueMap } from '../src/types/destructiveTestType';
import { GeometryType, GeometryValueMap } from '../src/types/geometryType';
import { GPRTestType, GPRTestValueMap } from '../src/types/GPRTestType';
import { LocationType, LocationTypeValueMap } from '../src/types/locationType';
import { MaterialType, MaterialValueMap } from '../src/types/materialType';
import { PreStressStrandType, PreStressStrandValueMap } from '../src/types/preStressStrandType';
import { RebarEntry, RebarType, RebarValueMap } from '../src/types/rebarType';
import { ReboundTestType, ReboundTestValueMap } from '../src/types/reboundTestType';
import { UserType, UserValueMap } from '../src/types/userType';
import { ValueType } from '../src/types/valueType';
import { ReboundTestKeyType } from '../src/enums/reboundTestKeyType';
import { ComponentValueMap } from '../src/types/componentType';
import { VisualInspectionType, VisualInspectionValueMap } from '../src/types/visualInspectionType';
import { VisualInspectionKeyType } from '../src/enums/visualInspectionKeyType';

const getRandomNumberArray = (length: number, min: number, max: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * (max - min)) + min);

const getRandomNestedNumeberArray = (length: number, min: number, max: number) =>
  Array.from({ length }, () => getRandomNumberArray(length, min, max));

const normalCaseValueMapCast = <T, U extends string>(valueMap: Record<U, ValueType>) =>
  Object.fromEntries(
    Object.entries(valueMap).map(([k, valueType]) => [k, getBoilerPlateDataForValyeType(valueType as ValueType)])
  ) as T;

export const getBoilerPlateDataForValyeType = (t: ValueType): any => {
  switch (t) {
    case 'number':
      return 0;
    case 'string':
      return btoa(Math.random().toString(36));
    case 'LocationType':
      return normalCaseValueMapCast<LocationType, LocationKeyType>(LocationTypeValueMap);
    case 'numberArray':
      return getRandomNumberArray(5, 0, 100);
    case 'nestedNumberArray':
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
