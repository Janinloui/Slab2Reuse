import { ComponentCategory } from '../enums/componentCategory';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { ValueType } from './valueType';

export type SlabType = {
  [GeometryKeyType.Id]: string;
  [GeometryKeyType.CrossSectionId]: string;
  [GeometryKeyType.ComponentCategory]: ComponentCategory.Slab;
  [GeometryKeyType.Length]: number;
};

export type ColumnType = {
  [GeometryKeyType.Id]: string;
  [GeometryKeyType.CrossSectionId]: string;
  [GeometryKeyType.ComponentCategory]: ComponentCategory.Column;
  [GeometryKeyType.Height]: number;
};

export type GeometryType = SlabType | ColumnType;

export const GeometryValueMap: Record<GeometryKeyType, ValueType> = {
  [GeometryKeyType.Id]: 'string',
  [GeometryKeyType.CrossSectionId]: 'string',
  [GeometryKeyType.ComponentCategory]: 'ComponentCategory',
  [GeometryKeyType.Length]: 'number',
  [GeometryKeyType.Height]: 'number'
};
