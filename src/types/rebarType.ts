import { RebarCategory as RebarCategory } from '../enums/rebarCategory';
import { RebarKeyType } from '../enums/rebarKeyType';
import { ValueType } from './valueType';

export type RebarEntry = {
  [RebarKeyType.RebarDiameter]: number;
  [RebarKeyType.RebarAmount]: number;
};

export type HomogeneusRebarType = {
  [RebarKeyType.Id]: string;
  [RebarKeyType.RebarCategory]: RebarCategory.Homogeneus;
  [RebarKeyType.RebarEntries]: [RebarEntry];
  [RebarKeyType.RebarMaterialId]: string;
};

export type TwoTypesRebarType = {
  [RebarKeyType.Id]: string;
  [RebarKeyType.RebarCategory]: RebarCategory.TwoTypes;
  [RebarKeyType.RebarEntries]: [RebarEntry, RebarEntry];
  [RebarKeyType.RebarMaterialId]: string;
};

export type ThreeTypesRebarType = {
  [RebarKeyType.Id]: string;
  [RebarKeyType.RebarCategory]: RebarCategory.ThreeTypes;
  [RebarKeyType.RebarEntries]: [RebarEntry, RebarEntry, RebarEntry];
  [RebarKeyType.RebarMaterialId]: string;
};

export type FourTypesRebarType = {
  [RebarKeyType.Id]: string;
  [RebarKeyType.RebarCategory]: RebarCategory.FourTypes;
  [RebarKeyType.RebarEntries]: [RebarEntry, RebarEntry, RebarEntry, RebarEntry];
  [RebarKeyType.RebarMaterialId]: string;
};

export type RebarType = HomogeneusRebarType | TwoTypesRebarType | ThreeTypesRebarType | FourTypesRebarType;

export const RebarValueMap: Record<RebarKeyType, ValueType> = {
  [RebarKeyType.Id]: 'string',
  [RebarKeyType.RebarCategory]: 'RebarCategory',
  [RebarKeyType.RebarConfigurationId]: 'string',
  [RebarKeyType.RebarDiameter]: 'number',
  [RebarKeyType.RebarAmount]: 'number',
  [RebarKeyType.RebarEntries]: 'RebarEntryArray',
  [RebarKeyType.RebarMaterialId]: 'string'
};
