import { ValueType } from './valueType';
import { LocationType } from './locationType';
import { UserType } from './userType';  

enum BuildingTypeKeys {
  Id = 'buildingId',
  Location = 'buildingLocation',
  Address = 'buildingAddress',
  User = 'buildingOwner',
  FormerUse = 'buildingFormerUse',
  GFA = 'buildingGFA',
  Complexity = 'buildingComplexity',
  Img = 'buildingImg'
}

export type BuildingType = {
  [BuildingTypeKeys.Id]: string;
  [BuildingTypeKeys.Location]: LocationType;
  [BuildingTypeKeys.Address]: string;
  [BuildingTypeKeys.User]: UserType;
  [BuildingTypeKeys.FormerUse]: string;
  [BuildingTypeKeys.GFA]: number;
  [BuildingTypeKeys.Complexity]: number;
  [BuildingTypeKeys.Img]: string;
  locationType: LocationType;
};

export const BuildingTypeValueMap: Record<BuildingTypeKeys, ValueType> = {
  [BuildingTypeKeys.Id]: 'string',
  [BuildingTypeKeys.Location]: 'LocationType',
  [BuildingTypeKeys.Address]: 'string',
  [BuildingTypeKeys.User]: 'UserType',
  [BuildingTypeKeys.FormerUse]: 'string',
  [BuildingTypeKeys.GFA]: 'number',
  [BuildingTypeKeys.Complexity]: 'number',
  [BuildingTypeKeys.Img]: 'string',
};

