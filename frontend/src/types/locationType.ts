import { ValueType } from './valueType';

// wgs 84
export type LocationType = {
  longitude: number;
  latitude: number;
  height: number;
};

export const LocationTypeValueMap: Record<keyof LocationType, ValueType> = {
  longitude: 'number',
  latitude: 'number',
  height: 'number',
};