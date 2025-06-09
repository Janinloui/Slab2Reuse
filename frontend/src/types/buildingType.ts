import { ValueType } from './valueType';
import { LocationType } from './locationType';
import { BuildingKeyType } from '../enums/buildingKeyType';

export type BuildingType = {
  [BuildingKeyType.Id]: string;
  [BuildingKeyType.Location]: LocationType;
  [BuildingKeyType.Address]: string;
  [BuildingKeyType.OwnerId]: string;
  [BuildingKeyType.FormerUse]: string;
  [BuildingKeyType.GFA]: number;
  [BuildingKeyType.Complexity]: number;
  [BuildingKeyType.Img]: string;
};

export const BuildingValueMap: Record<BuildingKeyType, ValueType> = {
  [BuildingKeyType.Id]: 'string',
  [BuildingKeyType.Location]: 'LocationType',
  [BuildingKeyType.Address]: 'string',
  [BuildingKeyType.OwnerId]: 'string',
  [BuildingKeyType.FormerUse]: 'string',
  [BuildingKeyType.GFA]: 'number',
  [BuildingKeyType.Complexity]: 'number',
  [BuildingKeyType.Img]: 'string'
};
