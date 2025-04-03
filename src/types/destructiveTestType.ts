import { DestructiveTestKeyType } from '../enums/destructiveTestKeyType';
import { ValueType } from './valueType';

export type DestructiveTestType = {
  [DestructiveTestKeyType.Id]: string;
  [DestructiveTestKeyType.GeometryTypeId]: string;
  [DestructiveTestKeyType.ImgLongitudinal]: string;
  [DestructiveTestKeyType.ImgTransverse]: string;
  [DestructiveTestKeyType.UserId]: string;
};

export const DestructiveTestValueMap: Record<DestructiveTestKeyType, ValueType> = {
  [DestructiveTestKeyType.Id]: 'string',
  [DestructiveTestKeyType.GeometryTypeId]: 'string',
  [DestructiveTestKeyType.ImgLongitudinal]: 'string',
  [DestructiveTestKeyType.ImgTransverse]: 'string',
  [DestructiveTestKeyType.UserId]: 'string'
};
