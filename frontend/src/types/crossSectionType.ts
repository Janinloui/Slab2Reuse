import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { ValueType } from './valueType';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { PreStressStrandType } from './preStressStrandType';

export type CrossSectionType = {
  [CrossSectionKeyType.Id]: string;
  [CrossSectionKeyType.CrossSectionCategory]: CrossSectionCategory;
  [CrossSectionKeyType.Width]: number;
  [CrossSectionKeyType.Height]: number;
  [CrossSectionKeyType.Moment]: number;
  [CrossSectionKeyType.Shear]: number;
  [CrossSectionKeyType.Normal]: number;
  [CrossSectionKeyType.RebarTypeId]: string;
  [CrossSectionKeyType.ConcreteMaterialTypeId]: string;
  [CrossSectionKeyType.PreStressStrandType]?: PreStressStrandType;
};

export const CrossSectionValueMap: Record<keyof CrossSectionType, ValueType> = {
  [CrossSectionKeyType.Id]: 'string',
  [CrossSectionKeyType.Width]: 'number',
  [CrossSectionKeyType.Height]: 'number',
  [CrossSectionKeyType.Moment]: 'number',
  [CrossSectionKeyType.Shear]: 'number',
  [CrossSectionKeyType.Normal]: 'number',
  [CrossSectionKeyType.RebarTypeId]: 'string',
  [CrossSectionKeyType.CrossSectionCategory]: 'CrossSectionCategory',
  [CrossSectionKeyType.ConcreteMaterialTypeId]: 'string',
  [CrossSectionKeyType.PreStressStrandType]: 'PreStressStrandType'
};
