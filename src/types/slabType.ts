//This file defines the datastructure for slab elements
//and the mapping of the attributes to the table columns

import { SlabKeyType } from '../enums/attributeNames';
import { VisualCondition } from '../enums/visualCondition';

export type SlabType = {
  [SlabKeyType.Id]: string;
  [SlabKeyType.PlanReference]: string;
  [SlabKeyType.Location_x]: number;
  [SlabKeyType.Location_y]: number;
  [SlabKeyType.Location_z]: number;
  [SlabKeyType.Strength]: string;
  [SlabKeyType.Dimensions_l]: number;
  [SlabKeyType.Dimensions_w]: number;
  [SlabKeyType.Dimensions_h]: number;
  [SlabKeyType.Liveload]: number;
  [SlabKeyType.TypeOfElement]: string;
  [SlabKeyType.RebarDiameterTop]: number;
  [SlabKeyType.RebarAmountTop]: number;
  [SlabKeyType.RebarDiameterBottom]: number;
  [SlabKeyType.RebarAmountBottom]: number;
  [SlabKeyType.Condition]: VisualCondition;
  [SlabKeyType.ReboundTestData]: number[][];
};

/**
 * Map that describes what the type values of each of the SlabKeys are
 */
export const SlabTypeValueMap: Record<SlabKeyType, 'number' | 'string' | 'enum' | 'numberArray' | 'nestedNumberArray'> = {
  [SlabKeyType.Id]: 'string',
  [SlabKeyType.PlanReference]: 'string',
  [SlabKeyType.Location_x]: 'number',
  [SlabKeyType.Location_y]: 'number',
  [SlabKeyType.Location_z]: 'number',
  [SlabKeyType.Strength]: 'string',
  [SlabKeyType.Dimensions_l]: 'number',
  [SlabKeyType.Dimensions_w]: 'number',
  [SlabKeyType.Dimensions_h]: 'number',
  [SlabKeyType.Liveload]: 'number',
  [SlabKeyType.TypeOfElement]: 'string',
  [SlabKeyType.RebarDiameterTop]: 'number',
  [SlabKeyType.RebarAmountTop]: 'number',
  [SlabKeyType.RebarDiameterBottom]: 'number',
  [SlabKeyType.RebarAmountBottom]: 'number',
  [SlabKeyType.Condition]: 'enum',
  [SlabKeyType.ReboundTestData]: 'nestedNumberArray',
};

export const StabTypeGeometryAttributes = [
  SlabKeyType.Dimensions_l,
  SlabKeyType.Dimensions_w,
  SlabKeyType.Dimensions_h,
  SlabKeyType.Location_x,
  SlabKeyType.Location_y,
  SlabKeyType.Location_z,
];

export const DefaultDataMap: Partial<Record<SlabKeyType, any>> = {
  [SlabKeyType.Location_z]: 0,
  [SlabKeyType.ReboundTestData]: [],
};
