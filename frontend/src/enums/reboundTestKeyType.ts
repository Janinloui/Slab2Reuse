import { ValueType } from '../types/valueType';

export enum ReboundTestKeyType {
  ReboundValue = 'reboundValue',
  ReboundDate = 'reboundDate',
  Location = 'reboundLocation',
  UserId = 'reboundUserId'
}

export const ReboundTestValueMap: Record<ReboundTestKeyType, ValueType> = {
  [ReboundTestKeyType.ReboundValue]: 'numberArrayArray',
  [ReboundTestKeyType.ReboundDate]: 'string',
  [ReboundTestKeyType.Location]: 'LocationType',
  [ReboundTestKeyType.UserId]: 'string'
};
