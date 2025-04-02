import { UserType } from './userType';
import { LocationType } from './locationType';
import { GPRTestKeyType } from '../enums/gprTestKeyType';
import { ValueType } from './valueType';

export type GPRTestType = {
  [GPRTestKeyType.Id]: string;
  [GPRTestKeyType.RebarDiameter]: number;
  [GPRTestKeyType.CoverDepth]: number;
  [GPRTestKeyType.RebarAmount]: number;
  [GPRTestKeyType.Date]: string;
  [GPRTestKeyType.User]: UserType;
  [GPRTestKeyType.Location]: LocationType;
};

export const GPRTestValueMap: Record<GPRTestKeyType, ValueType> = {
  [GPRTestKeyType.Id]: 'string',
  [GPRTestKeyType.RebarDiameter]: 'number',
  [GPRTestKeyType.CoverDepth]: 'number',
  [GPRTestKeyType.RebarAmount]: 'number',
  [GPRTestKeyType.Date]: 'string',
  [GPRTestKeyType.User]: 'UserType',
  [GPRTestKeyType.Location]: 'LocationType',
};
