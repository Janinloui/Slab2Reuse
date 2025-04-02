import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { ValueType } from './valueType';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { RebarType } from './rebarType';

export type CrossSectionType = {
  [CrossSectionKeyType.Id]: string;
  [CrossSectionKeyType.Width]: number;
  [CrossSectionKeyType.Height]: number;
  [CrossSectionKeyType.Moment]: number;
  [CrossSectionKeyType.Shear]: number;
  [CrossSectionKeyType.Normal]: number;
  [CrossSectionKeyType.RebarConfiguration]: RebarType;
  [CrossSectionKeyType.CrossSectionCategory]: CrossSectionCategory;
};

export const CrossSectionTypeValueMap: Record<keyof CrossSectionType, ValueType> = {
  [CrossSectionKeyType.Id]: 'string',
  [CrossSectionKeyType.Width]: 'number',
  [CrossSectionKeyType.Height]: 'number',
  [CrossSectionKeyType.Moment]: 'number',
  [CrossSectionKeyType.Shear]: 'number',
  [CrossSectionKeyType.Normal]: 'number',
  [CrossSectionKeyType.RebarConfiguration]: 'RebarConfiguration',
  [CrossSectionKeyType.CrossSectionCategory]: 'CrossSectionCategory',
};
