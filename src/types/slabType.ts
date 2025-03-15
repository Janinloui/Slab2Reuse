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
};
