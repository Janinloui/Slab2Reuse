import { LocationType } from './locationType';
import { ReboundTestKeyType } from '../enums/reboundTestKeyType';
import { ValueType } from './valueType';

export type ReboundTestType = {
  [ReboundTestKeyType.ReboundValue]: number[]; //store multiple values
  [ReboundTestKeyType.ReboundDate]: string;
  [ReboundTestKeyType.UserId]: string;
  [ReboundTestKeyType.Location]: LocationType;
};

export const ReboundTestValueMap: Record<ReboundTestKeyType, ValueType> = {
  [ReboundTestKeyType.ReboundValue]: 'numberArray', //store multiple values
  [ReboundTestKeyType.ReboundDate]: 'string',
  [ReboundTestKeyType.UserId]: 'string',
  [ReboundTestKeyType.Location]: 'LocationType'
};
