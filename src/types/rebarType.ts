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
  [RebarKeyType.RebarConfigurationId]: string;
  [RebarKeyType.RebarEntries]: [RebarEntry];
};

export type TwoTypesRebarType = {
  [RebarKeyType.Id]: string;
  [RebarKeyType.RebarCategory]: RebarCategory.TwoTypes;
  [RebarKeyType.RebarConfigurationId]: string;
  [RebarKeyType.RebarEntries]: [RebarEntry, RebarEntry];
};

export type ThreeTypesRebarType = {
  [RebarKeyType.Id]: string;
  [RebarKeyType.RebarCategory]: RebarCategory.ThreeTypes;
  [RebarKeyType.RebarConfigurationId]: string;
  [RebarKeyType.RebarEntries]: [RebarEntry, RebarEntry, RebarEntry];
};

export type FourTypesRebarType = {
  [RebarKeyType.Id]: string;
  [RebarKeyType.RebarCategory]: RebarCategory.FourTypes;
  [RebarKeyType.RebarConfigurationId]: string;
  [RebarKeyType.RebarEntries]: [RebarEntry, RebarEntry, RebarEntry, RebarEntry];
};

export type RebarType = HomogeneusRebarType | TwoTypesRebarType | ThreeTypesRebarType | FourTypesRebarType;

export const RebarValueMap: Record<RebarKeyType, ValueType> = {
  [RebarKeyType.Id]: 'string',
  [RebarKeyType.RebarCategory]: 'RebarCategory',
  [RebarKeyType.RebarConfigurationId]: 'string',
  [RebarKeyType.RebarDiameter]: 'number',
  [RebarKeyType.RebarAmount]: 'number',
  [RebarKeyType.RebarEntries]: 'RebarEntryArray',
};
