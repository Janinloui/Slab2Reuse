import { PreStressStrandKeyType } from '../enums/preStressStrandKeyType';
import { LocationType } from './locationType';
import { ValueType } from './valueType';

export type PreStressStrandType = {
  [PreStressStrandKeyType.PreStressForce]: number;
  [PreStressStrandKeyType.PreStressSteelClass]: string;
  [PreStressStrandKeyType.PreStressSteelDiameter]: number;
  [PreStressStrandKeyType.PreStressAmount]: number;
  [PreStressStrandKeyType.Date]: string;
  [PreStressStrandKeyType.Location]: LocationType;
  [PreStressStrandKeyType.ManufacturerId]: string;
};

export const PreStressStrandValueMap: Record<PreStressStrandKeyType, ValueType> = {
  [PreStressStrandKeyType.PreStressForce]: 'number',
  [PreStressStrandKeyType.PreStressSteelClass]: 'string',
  [PreStressStrandKeyType.PreStressSteelDiameter]: 'number',
  [PreStressStrandKeyType.PreStressAmount]: 'number',
  [PreStressStrandKeyType.Date]: 'string',
  [PreStressStrandKeyType.Location]: 'LocationType',
  [PreStressStrandKeyType.ManufacturerId]: 'string'
};
