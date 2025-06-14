import { LocationType } from './locationType';
import { GPRTestKeyType } from '../enums/gprTestKeyType';
import { ValueType } from './valueType';

export type GPRTestType = {
  [GPRTestKeyType.RebarDiameter]: number;
  [GPRTestKeyType.CoverDepth]: number;
  [GPRTestKeyType.RebarAmount]: number;
  [GPRTestKeyType.Date]: string;
  [GPRTestKeyType.UserId]: string;
  [GPRTestKeyType.Location]: LocationType;
};

export const GPRTestValueMap: Record<GPRTestKeyType, ValueType> = {
  [GPRTestKeyType.RebarDiameter]: 'number',
  [GPRTestKeyType.CoverDepth]: 'number',
  [GPRTestKeyType.RebarAmount]: 'number',
  [GPRTestKeyType.Date]: 'string',
  [GPRTestKeyType.UserId]: 'string',
  [GPRTestKeyType.Location]: 'LocationType'
};
