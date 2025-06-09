import { LocationType } from './locationType';
import { VisualInspectionKeyType } from '../enums/visualInspectionKeyType';
import { ValueType } from './valueType';

export type VisualInspectionType = {
  [VisualInspectionKeyType.Img]: string;
  [VisualInspectionKeyType.DamageType]: string;
  [VisualInspectionKeyType.Date]: string;
  [VisualInspectionKeyType.UserId]: string;
  [VisualInspectionKeyType.Location]: LocationType;
};

export const VisualInspectionValueMap: Record<VisualInspectionKeyType, ValueType> = {
  [VisualInspectionKeyType.Img]: 'string',
  [VisualInspectionKeyType.DamageType]: 'string',
  [VisualInspectionKeyType.Date]: 'string',
  [VisualInspectionKeyType.UserId]: 'string',
  [VisualInspectionKeyType.Location]: 'LocationType'
};
