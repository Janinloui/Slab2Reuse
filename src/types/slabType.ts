import { SlabKeyType } from '../enums/attributeNames';

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
  [SlabKeyType.Condition]: 'Good'| 'Repairable' | 'Broken';
};

export const SlabTypeValueMap: Record<SlabKeyType, 'number' | 'string'> = {
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
  [SlabKeyType.Condition]: 'string',
};

export const StabTypeGeometryAttributes = [
  SlabKeyType.Dimensions_l,
  SlabKeyType.Dimensions_w,
  SlabKeyType.Dimensions_h,
  SlabKeyType.Location_x,
  SlabKeyType.Location_y,
  SlabKeyType.Location_z,
];


//This file defines the datastructure for slab elements 
//and the mapping of the attributes to the table columns