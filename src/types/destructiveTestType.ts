import { DestructiveTestKeyType } from '../enums/destructiveTestKeyType';
import { ValueType } from './valueType';

export type DestructiveTestType = {
  [DestructiveTestKeyType.GeometryTypeId]: string;
  [DestructiveTestKeyType.ImgLongitudinal]: string;
  [DestructiveTestKeyType.ImgTransverse]: string;
  [DestructiveTestKeyType.UserId]: string;
};

export const DestructiveTestValueMap: Record<DestructiveTestKeyType, ValueType> = {
  [DestructiveTestKeyType.GeometryTypeId]: 'string',
  [DestructiveTestKeyType.ImgLongitudinal]: 'string',
  [DestructiveTestKeyType.ImgTransverse]: 'string',
  [DestructiveTestKeyType.UserId]: 'string'
};
