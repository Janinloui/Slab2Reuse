import { LocationKeyType } from '../enums/locationKeyType';
import { ValueType } from './valueType';

// wgs 84
export type LocationType = {
  [LocationKeyType.Longitude]: number;
  [LocationKeyType.Latitude]: number;
  [LocationKeyType.Height]: number;
};

export const LocationTypeValueMap: Record<LocationKeyType, ValueType> = {
  [LocationKeyType.Longitude]: 'number',
  [LocationKeyType.Latitude]: 'number',
  [LocationKeyType.Height]: 'number',
};
