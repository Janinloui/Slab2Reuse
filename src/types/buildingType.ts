import { ValueType } from './valueType';
import { LocationType } from './locationType';
import { UserType } from './userType';
import { BuildingKeyType } from '../enums/buildingKeyType';

export type BuildingType = {
  [BuildingKeyType.Id]: string;
  [BuildingKeyType.Location]: LocationType;
  [BuildingKeyType.Address]: string;
  [BuildingKeyType.User]: UserType;
  [BuildingKeyType.FormerUse]: string;
  [BuildingKeyType.GFA]: number;
  [BuildingKeyType.Complexity]: number;
  [BuildingKeyType.Img]: string;
};

export const BuildingTypeValueMap: Record<BuildingKeyType, ValueType> = {
  [BuildingKeyType.Id]: 'string',
  [BuildingKeyType.Location]: 'LocationType',
  [BuildingKeyType.Address]: 'string',
  [BuildingKeyType.User]: 'UserType',
  [BuildingKeyType.FormerUse]: 'string',
  [BuildingKeyType.GFA]: 'number',
  [BuildingKeyType.Complexity]: 'number',
  [BuildingKeyType.Img]: 'string',
};
