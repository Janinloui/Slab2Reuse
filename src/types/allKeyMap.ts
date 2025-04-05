import { BuildingValueMap } from './buildingType';
import { ChemicalTestValueMap } from './chemicalTestType';
import { ComponentValueMap } from './componentType';
import { CoreTestValueMap } from './coreTestType';
import { CrossSectionValueMap } from './crossSectionType';
import { DatabaseValueMap } from './databseType';
import { DestructiveTestValueMap } from './destructiveTestType';
import { GeometryValueMap } from './geometryType';
import { GPRTestValueMap } from './gprTestType';
import { LocationValueMap } from './locationType';
import { MaterialValueMap } from './materialType';
import { PreStressStrandValueMap } from './preStressStrandType';
import { RebarValueMap } from './rebarType';
import { UserValueMap } from './userType';
import { ValueType } from './valueType';
import { VisualInspectionValueMap } from './visualInspectionType';

export const AllKeyMap: Record<string, ValueType> = Object.fromEntries([
  ...Object.entries(BuildingValueMap),
  ...Object.entries(ChemicalTestValueMap),
  ...Object.entries(ComponentValueMap),
  ...Object.entries(CoreTestValueMap),
  ...Object.entries(CrossSectionValueMap),
  ...Object.entries(DatabaseValueMap),
  ...Object.entries(DestructiveTestValueMap),
  ...Object.entries(GeometryValueMap),
  ...Object.entries(GPRTestValueMap),
  ...Object.entries(LocationValueMap),
  ...Object.entries(MaterialValueMap),
  ...Object.entries(PreStressStrandValueMap),
  ...Object.entries(RebarValueMap),
  ...Object.entries(UserValueMap),
  ...Object.entries(VisualInspectionValueMap),
]);
