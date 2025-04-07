import { DestructiveTestKeyType } from '../enums/destructiveTestKeyType';
import { ValueType } from './valueType';

export type DestructiveTestType = {
  [DestructiveTestKeyType.GeometryTypeId]: string;
  [DestructiveTestKeyType.Date]: string;
  [DestructiveTestKeyType.ImgLongitudinal]: string;
  [DestructiveTestKeyType.ImgTransverse]: string;
  [DestructiveTestKeyType.UserId]: string;
  [DestructiveTestKeyType.ShearStrength]: number;
  [DestructiveTestKeyType.CompressiveStrength]: number;
  [DestructiveTestKeyType.TensileStrength]: number;
  [DestructiveTestKeyType.YoungsModulus]: number;
  [DestructiveTestKeyType.MomentCapacity]: number;
  [DestructiveTestKeyType.ShearCapacity]: number;
  [DestructiveTestKeyType.NormalCapacity]: number;
  [DestructiveTestKeyType.Density]: number;
};

export const DestructiveTestValueMap: Record<DestructiveTestKeyType, ValueType> = {
  [DestructiveTestKeyType.GeometryTypeId]: 'string',
  [DestructiveTestKeyType.ImgLongitudinal]: 'string',
  [DestructiveTestKeyType.ImgTransverse]: 'string',
  [DestructiveTestKeyType.UserId]: 'string',
  [DestructiveTestKeyType.Date]: 'string',
  [DestructiveTestKeyType.ShearStrength]: 'number',
  [DestructiveTestKeyType.CompressiveStrength]: 'number',
  [DestructiveTestKeyType.TensileStrength]: 'number',
  [DestructiveTestKeyType.YoungsModulus]: 'number',
  [DestructiveTestKeyType.MomentCapacity]: 'number',
  [DestructiveTestKeyType.ShearCapacity]: 'number',
  [DestructiveTestKeyType.NormalCapacity]: 'number',
  [DestructiveTestKeyType.Density]: 'number'
};
