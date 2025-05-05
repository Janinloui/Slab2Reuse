import React, { ComponentType } from 'react';
import { ValueType } from '../types/valueType';
import { RebarKeyType } from '../enums/rebarKeyType';
import { RebarType, RebarValueMap } from '../types/rebarType';
import { BuildingKeyType } from '../enums/buildingKeyType';
import { ChemicalTestKeyType } from '../enums/chemicalTestKeyType';
import { ComponentKeyType } from '../enums/componentKeyType';
import { CoreTestKeyType } from '../enums/coreTestKeyType';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { DestructiveTestKeyType } from '../enums/destructiveTestKeyType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { GPRTestKeyType } from '../enums/gprTestKeyType';
import { LocationKeyType } from '../enums/locationKeyType';
import { MaterialKeyType } from '../enums/materialKeyType';
import { PreStressStrandKeyType } from '../enums/preStressStrandKeyType';
import { ReboundTestKeyType, ReboundTestValueMap } from '../enums/reboundTestKeyType';
import { UserKeyType } from '../enums/userKeyType';
import { VisualInspectionKeyType } from '../enums/visualInspectionKeyType';
import { BuildingType, BuildingValueMap } from '../types/buildingType';
import { ChemicalTestType, ChemicalTestValueMap } from '../types/chemicalTestType';
import { ComponentValueMap } from '../types/componentType';
import { CoreTestType, CoreTestValueMap } from '../types/coreTestType';
import { CrossSectionType, CrossSectionValueMap } from '../types/crossSectionType';
import { DestructiveTestType, DestructiveTestValueMap } from '../types/destructiveTestType';
import { GeometryType, GeometryValueMap } from '../types/geometryType';
import { GPRTestType, GPRTestValueMap } from '../types/gprTestType';
import { LocationType, LocationValueMap } from '../types/locationType';
import { MaterialType, MaterialValueMap } from '../types/materialType';
import { PreStressStrandType, PreStressStrandValueMap } from '../types/preStressStrandType';
import { ReboundTestType } from '../types/reboundTestType';
import { UserType, UserValueMap } from '../types/userType';
import { VisualInspectionType, VisualInspectionValueMap } from '../types/visualInspectionType';

const normalCaseValueMapCast = <T, U extends string>(valueMap: Record<U, ValueType>) =>
  Object.fromEntries(
    Object.entries(valueMap).map(([k, valueType]) => [k, getNestedValueType(valueType as ValueType, k)])
  ) as T;

export const getNestedValueType = (t: ValueType, k?: string): any => {
  if (k?.endsWith('Id')) {
    switch (k) {
      case 'componentBuildingId':
      case 'materialBuildingId':
        return getNestedValueType('BuildingType');
      case 'geometryTypeId':
        return getNestedValueType('GeometryType');
      case 'destructiveTestGeometryTypeId':
        return getNestedValueType('GeometryType');
      case 'geometryTypeCrossSectionId':
        return getNestedValueType('CrossSectionType');
      case 'crossSectionRebarTypeId':
        return getNestedValueType('RebarType');
      case 'rebarMaterialId':
      case 'concreteMaterialTypeId':
        return getNestedValueType('MaterialType');
      case 'preStressManufacturerId':
      case 'visualInspectionUserId':
      case 'manufacturerId':
      case 'destructiveTestUserId':
      case 'coreTestUserId':
      case 'chemicalTestUserId':
      case 'gprTestUserId':
      case 'buildingOwnerId':
        return getNestedValueType('UserType');
      case 'geometryOriginalGeometryId':
        return 'string | undefined';
      case 'materialCrossSectionId':
        return 'string';
    }
    console.log(k);
  }

  switch (t) {
    case 'number':
    case 'string':
    case 'UserCategory':
    case 'MaterialCategory':
    case 'CrossSectionCategory':
    case 'ComponentCategory':
    case 'RebarCategory':
    case 'VisualCondition':
      return t;
    case 'LocationType':
      return normalCaseValueMapCast<LocationType, LocationKeyType>(LocationValueMap);
    case 'numberArray':
      return 'number[]';
    case 'numberArrayArray':
      return 'number[][]';
    case 'stringPairArray':
      return ['string', 'string'];
    case 'RebarType':
      return normalCaseValueMapCast<RebarType, RebarKeyType>(RebarValueMap);
    case 'RebarEntryArray':
      return [{ [RebarKeyType.RebarDiameter]: 'number', [RebarKeyType.RebarAmount]: 'number' }];
    case 'PreStressStrandType':
      return normalCaseValueMapCast<PreStressStrandType, PreStressStrandKeyType>(PreStressStrandValueMap);
    case 'VisualInspectionType':
      return normalCaseValueMapCast<VisualInspectionType, VisualInspectionKeyType>(VisualInspectionValueMap);
    case 'VisualInspectionTypeArray':
      return [getNestedValueType('VisualInspectionType')];
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
      return [getNestedValueType('BuildingType')];
    case 'UserType':
      return normalCaseValueMapCast<UserType, UserKeyType>(UserValueMap);
    case 'UserTypeArray':
      return [getNestedValueType('UserType')];
    case 'ComponentType':
      return normalCaseValueMapCast<ComponentType, ComponentKeyType>(ComponentValueMap);
    case 'ComponentTypeArray':
      return [getNestedValueType('ComponentType')];
    case 'GeometryType':
      return normalCaseValueMapCast<GeometryType, GeometryKeyType>(GeometryValueMap);
    case 'GeometryTypeArray':
      return [getNestedValueType('GeometryType')];
    case 'CrossSectionType':
      return normalCaseValueMapCast<CrossSectionType, CrossSectionKeyType>(CrossSectionValueMap);
    case 'CrossSectionTypeArray':
      return [getNestedValueType('CrossSectionType')];
    case 'MaterialType':
      return normalCaseValueMapCast<MaterialType, MaterialKeyType>(MaterialValueMap);
    case 'MaterialTypeArray':
      return [getNestedValueType('MaterialType')];
    case 'RebarType':
      return normalCaseValueMapCast<RebarType, RebarKeyType>(RebarValueMap);
    case 'RebarTypeArray':
      return [getNestedValueType('RebarType')];
  }
};

const createArrayComponent = (value: (string | object)[]) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
    {value.map((v, i) => (typeof v === 'object' ? createObjectComponent(value) : <span key={i}>{v}</span>))}
  </div>
);

const createObjectComponent = (json: object) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 4,
      paddingLeft: 10,
      borderLeft: '1px solid black'
    }}
  >
    {Object.entries(json).map(([k, value]) => (
      <div key={k} style={{ display: 'flex', flexDirection: 'row' }}>
        <span>{k}</span>
        {Array.isArray(value) ? (
          createArrayComponent(value)
        ) : typeof value === 'object' ? (
          createObjectComponent(value)
        ) : (
          <span>{': (' + value + ')'}</span>
        )}
      </div>
    ))}
  </div>
);

export const DataModelGraph: React.FC = () => (
  <div style={{ height: 'calc(100svh - 60px)', overflow: 'auto' }}>
    {createObjectComponent(getNestedValueType('ComponentType'))}
  </div>
);
