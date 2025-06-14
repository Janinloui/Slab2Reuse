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
import { RebarKeyType } from '../enums/rebarKeyType';
import { ReboundTestKeyType } from '../enums/reboundTestKeyType';
import { UserKeyType } from '../enums/userKeyType';
import { VisualInspectionKeyType } from '../enums/visualInspectionKeyType';
import { BuildingValueMap } from './buildingType';
import { ChemicalTestValueMap } from './chemicalTestType';
import { ComponentValueMap } from './componentType';
import { CoreTestValueMap } from './coreTestType';
import { CrossSectionValueMap } from './crossSectionType';
import { DatabaseValueArrayMap } from './databaseType';
import { DerivedTestKeyValueMap } from './dataOfTestsForGeometryType';
import { DestructiveTestValueMap } from './destructiveTestType';
import { GeometryValueMap } from './geometryType';
import { GPRTestValueMap } from './gprTestType';
import { LocationValueMap } from './locationType';
import { MaterialValueMap } from './materialType';
import { PreStressStrandValueMap } from './preStressStrandType';
import { RebarValueMap } from './rebarType';
import { ReboundTestValueMap } from './reboundTestType';
import { UserValueMap } from './userType';
import { ValueType } from './valueType';
import { VisualInspectionValueMap } from './visualInspectionType';

const allTypeEntries = [
  ...Object.entries(BuildingValueMap),
  ...Object.entries(ChemicalTestValueMap),
  ...Object.entries(ComponentValueMap),
  ...Object.entries(CoreTestValueMap),
  ...Object.entries(CrossSectionValueMap),
  ...Object.entries(DatabaseValueArrayMap),
  ...Object.entries(DestructiveTestValueMap),
  ...Object.entries(GeometryValueMap),
  ...Object.entries(GPRTestValueMap),
  ...Object.entries(LocationValueMap),
  ...Object.entries(MaterialValueMap),
  ...Object.entries(PreStressStrandValueMap),
  ...Object.entries(RebarValueMap),
  ...Object.entries(ReboundTestValueMap),
  ...Object.entries(UserValueMap),
  ...Object.entries(VisualInspectionValueMap),
  ...Object.entries(DerivedTestKeyValueMap),
  ['componentIds', 'stringArray']
];

export type AllNestedComponentKeyType =
  | BuildingKeyType
  | ChemicalTestKeyType
  | ComponentKeyType
  | CoreTestKeyType
  | CrossSectionKeyType
  | DestructiveTestKeyType
  | GeometryKeyType
  | GPRTestKeyType
  | LocationKeyType
  | MaterialKeyType
  | PreStressStrandKeyType
  | RebarKeyType
  | ReboundTestKeyType
  | UserKeyType
  | VisualInspectionKeyType;

export const AllKeyEntriesMap: Record<string, ValueType> = Object.fromEntries(allTypeEntries);

export const getKeyCountMap = () => {
  const object: Record<string, number> = {};

  for (const [key] of allTypeEntries) {
    if (key in object) object[key] += 1;
    else object[key] = 1;
  }

  return Object.entries(object).filter(([k, count]) => count > 1);
};
