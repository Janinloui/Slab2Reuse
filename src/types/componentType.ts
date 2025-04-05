//This file defines the datastructure for slab elements
//and the mapping of the attributes to the table columns
import { VisualCondition } from '../enums/visualCondition';
import { ComponentKeyType } from '../enums/componentKeyType';
import { ValueType } from './valueType';
import { LocationType } from './locationType';
import { VisualInspectionType } from './visualInspectionType';
import { DestructiveTestType } from './destructiveTestType';
import { CoreTestType } from './coreTestType';
import { ChemicalTestType } from './chemicalTestType';
import { GPRTestType } from './gprTestType';
import { ReboundTestType } from './reboundTestType';

export type ComponentType = {
  [ComponentKeyType.Id]: string;
  [ComponentKeyType.BuildingId]: string;
  [ComponentKeyType.Img]: string;
  [ComponentKeyType.ManufacturerId]: string;
  [ComponentKeyType.Condition]: VisualCondition;
  [ComponentKeyType.NoHarmfulSubstance]: boolean;
  [ComponentKeyType.AvailableFrom]: string;
  [ComponentKeyType.Buyer]: string;
  [ComponentKeyType.Price]: number;
  [ComponentKeyType.LoadingCondition]: string;
  [ComponentKeyType.PlanReference]: string;
  [ComponentKeyType.Yaw]: number;
  [ComponentKeyType.GeometryTypeId]: string;
  [ComponentKeyType.Floor]: number;
  [ComponentKeyType.Location]: LocationType;
  [ComponentKeyType.VisualInspection]: VisualInspectionType[];
  [ComponentKeyType.DestructionTest]?: DestructiveTestType;
  [ComponentKeyType.CoreTest]?: CoreTestType;
  [ComponentKeyType.ChemicalTest]?: ChemicalTestType;
  [ComponentKeyType.GPRTest]?: GPRTestType;
  [ComponentKeyType.ReboundTest]?: ReboundTestType;
};

/**
 * Map that describes what the type values of each of the SlabKeys are
 */
export const ComponentValueMap: Record<ComponentKeyType, ValueType> = {
  [ComponentKeyType.Id]: 'string',
  [ComponentKeyType.BuildingId]: 'string',
  [ComponentKeyType.Img]: 'string',
  [ComponentKeyType.Condition]: 'VisualCondition',
  [ComponentKeyType.NoHarmfulSubstance]: 'string',
  [ComponentKeyType.AvailableFrom]: 'string',
  [ComponentKeyType.Buyer]: 'string',
  [ComponentKeyType.Price]: 'number',
  [ComponentKeyType.PlanReference]: 'string',
  [ComponentKeyType.LoadingCondition]: 'string',
  [ComponentKeyType.Yaw]: 'number',
  [ComponentKeyType.Floor]: 'number',
  [ComponentKeyType.Location]: 'LocationType',
  [ComponentKeyType.VisualInspection]: 'VisualInspectionTypeArray',
  [ComponentKeyType.ManufacturerId]: 'string',
  [ComponentKeyType.GeometryTypeId]: 'string',
  [ComponentKeyType.DestructionTest]: 'DestructiveTestType',
  [ComponentKeyType.CoreTest]: 'CoreTestType',
  [ComponentKeyType.ChemicalTest]: 'ChemicalTestType',
  [ComponentKeyType.GPRTest]: 'GPRTestType',
  [ComponentKeyType.ReboundTest]: 'ReboundTestType'
};
