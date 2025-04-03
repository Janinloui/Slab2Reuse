import { CoreTestKeyType } from '../enums/coreTestKeyType';
import { LocationType } from './locationType';
import { ValueType } from './valueType';

export type CoreTestType = {
  [CoreTestKeyType.Id]: string;
  [CoreTestKeyType.CoreDiameter]: number;
  [CoreTestKeyType.CoreCompressiveStrength]: number;
  [CoreTestKeyType.Date]: string;
  [CoreTestKeyType.UserId]: string;
  [CoreTestKeyType.Location]: LocationType;
};

export const CoreTestValueMap: Record<CoreTestKeyType, ValueType> = {
  [CoreTestKeyType.Id]: 'string',
  [CoreTestKeyType.CoreDiameter]: 'number',
  [CoreTestKeyType.CoreCompressiveStrength]: 'number',
  [CoreTestKeyType.Date]: 'string',
  [CoreTestKeyType.UserId]: 'string',
  [CoreTestKeyType.Location]: 'LocationType'
};
