import { LocationType } from './locationType';
import { UserType } from './userType';
import { ReboundKeyType } from '../enums/reboundKeyType';
import { ValueType } from './valueType';

export type ReboundTestType = {
  [ReboundKeyType.Id]: string;
  [ReboundKeyType.ReboundValue]: number[]; //store multiple values
  [ReboundKeyType.ReboundDate]: string;
  [ReboundKeyType.User]: UserType;
  [ReboundKeyType.Location]: LocationType;
};

export const ReboundTestValueMap: Record<ReboundKeyType, ValueType> = {
  [ReboundKeyType.Id]: 'string',
  [ReboundKeyType.ReboundValue]: 'numberArray', //store multiple values
  [ReboundKeyType.ReboundDate]: 'string',
  [ReboundKeyType.User]: 'UserType',
  [ReboundKeyType.Location]: 'LocationType',
};
