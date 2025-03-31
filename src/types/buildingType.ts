import { LocationType } from './locationType';
import { ValueType } from './valueType';

enum BuildingTypeKeys {
  Id = 'buildingId',
  Location = 'buildingLocation',
  OwnerId = 'buildingOwnerId',
  Address = 'buildingAddress',
}

export type BuildingType = {
  [BuildingTypeKeys.Id]: string;
  [BuildingTypeKeys.Location]: LocationType;
  [BuildingTypeKeys.Address]: string;
  [BuildingTypeKeys.OwnerId]: string;
};

export const BuildingTypeValueMap: Record<BuildingTypeKeys, ValueType> = {
  [BuildingTypeKeys.Id]: 'string',
  [BuildingTypeKeys.Location]: 'LocationType',
  [BuildingTypeKeys.Address]: 'string',
  [BuildingTypeKeys.OwnerId]: 'string',
};
