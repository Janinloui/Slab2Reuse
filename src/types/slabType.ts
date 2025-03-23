//This file defines the datastructure for slab elements
//and the mapping of the attributes to the table columns

import { SlabKeyType } from '../enums/attributeNames';
import { VisualCondition } from '../enums/visualCondition';

export type SlabType = {
  [SlabKeyType.Id]: string;
  [SlabKeyType.PlanReference]: string;
  [SlabKeyType.Location_x]: number;
  [SlabKeyType.Location_y]: number;
  [SlabKeyType.Floor]: number;
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
  [SlabKeyType.Yaw]: number;
  [SlabKeyType.VisualInspectionImages]: [string, string][];
};

/**
 * Map that describes what the type values of each of the SlabKeys are
 */
export const SlabTypeValueMap: Record<SlabKeyType, 'number' | 'string' | 'enum' | 'numberArray' | 'nestedNumberArray' | 'stringPairArray'> = {
  [SlabKeyType.Id]: 'string',
  [SlabKeyType.PlanReference]: 'string',
  [SlabKeyType.Location_x]: 'number',
  [SlabKeyType.Location_y]: 'number',
  [SlabKeyType.Floor]: 'number',
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
  [SlabKeyType.Yaw]: 'number',
  [SlabKeyType.VisualInspectionImages]: 'stringPairArray',
};

export const StabTypeGeometryAttributes = [
  SlabKeyType.Dimensions_l,
  SlabKeyType.Dimensions_w,
  SlabKeyType.Dimensions_h,
  SlabKeyType.Location_x,
  SlabKeyType.Location_y,
  SlabKeyType.Floor,
];

export const DefaultDataMap: Partial<Record<SlabKeyType, any>> = {
  [SlabKeyType.Floor]: 0,
  [SlabKeyType.ReboundTestData]: [],
  [SlabKeyType.Yaw]: 0,
};
