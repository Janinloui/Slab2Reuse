import { CoreTestKeyType } from '../enums/coreTestKeyType';
import { LocationType } from './locationType';
import { UserType } from './userType';
import { ValueType } from './valueType';

export type CoreTestType = {
  [CoreTestKeyType.Id]: string;
  [CoreTestKeyType.CoreDiameter]: number;
  [CoreTestKeyType.CoreCompressiveStrength]: number;
  [CoreTestKeyType.Date]: string;
  [CoreTestKeyType.User]: UserType;
  [CoreTestKeyType.Location]: LocationType;
};

export const CoreTestValueMap: Record<CoreTestKeyType, ValueType> = {
  [CoreTestKeyType.Id]: 'string',
  [CoreTestKeyType.CoreDiameter]: 'number',
  [CoreTestKeyType.CoreCompressiveStrength]: 'number',
  [CoreTestKeyType.Date]: 'string',
  [CoreTestKeyType.User]: 'UserType',
  [CoreTestKeyType.Location]: 'LocationType',
};
