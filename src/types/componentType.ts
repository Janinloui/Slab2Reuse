//This file defines the datastructure for slab elements
//and the mapping of the attributes to the table columns
import { VisualCondition } from '../enums/visualCondition';
import { ComponentKeyType } from '../enums/componentKeyType';
import { ValueType } from './valueType';
import { LocationType } from './locationType';


export type ComponentType = {
  [ComponentKeyType.Id]: string;
  [ComponentKeyType.Img]: string;
  [ComponentKeyType.Condition]: VisualCondition;
  [ComponentKeyType.NoHarmfulSubstance]: boolean;
  [ComponentKeyType.AvailableFrom]: string;
  [ComponentKeyType.Buyer]: string;
  [ComponentKeyType.Price]: number;
  [ComponentKeyType.PlanReference]: string;
  [ComponentKeyType.LoadingCondition]: string;
  [ComponentKeyType.Yaw]: number;
  [ComponentKeyType.Floor]: number;
  [ComponentKeyType.Location_x]: number;
  [ComponentKeyType.Location_y]: number;
  locationType: LocationType,
  };

/**
 * Map that describes what the type values of each of the SlabKeys are
 */
export const ComponentTypeValueMap: Record<ComponentKeyType, ValueType> = {
  [ComponentKeyType.Id]: 'string',
  [ComponentKeyType.Img]: 'string',
  [ComponentKeyType.Condition]: 'enum',
  [ComponentKeyType.NoHarmfulSubstance]: 'string',
  [ComponentKeyType.AvailableFrom]: 'string',
  [ComponentKeyType.Buyer]: 'string',
  [ComponentKeyType.Price]: 'number',
  [ComponentKeyType.PlanReference]: 'string',
  [ComponentKeyType.LoadingCondition]: 'string',
  [ComponentKeyType.Yaw]: 'number',
  [ComponentKeyType.Floor]: 'number',
  [ComponentKeyType.Location_x]: 'number',
  [ComponentKeyType.Location_y]: 'number',
};  


export const DefaultDataMap: Partial<Record<ComponentKeyType, any>> = {
  [ComponentKeyType.Floor]: 0,
  [ComponentKeyType.Yaw]: 0,
};
