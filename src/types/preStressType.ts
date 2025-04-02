import { PreStressKeyType } from '../enums/preStressKeyType';
import { LocationType } from './locationType';
import { UserType } from './userType';
import { ValueType } from './valueType';

export type PreStressType = {
  [PreStressKeyType.Id]: string;
  [PreStressKeyType.PreStressForce]: number;
  [PreStressKeyType.PreStressSteelClass]: string;
  [PreStressKeyType.PreStressSteelDiameter]: number;
  [PreStressKeyType.PreStressAmount]: number;
  [PreStressKeyType.Date]: string;
  [PreStressKeyType.Location]: LocationType;
  [PreStressKeyType.User]: UserType;
};

export const PreStressValueMap: Record<PreStressKeyType, ValueType> = {
  [PreStressKeyType.Id]: 'string',
  [PreStressKeyType.PreStressForce]: 'number',
  [PreStressKeyType.PreStressSteelClass]: 'string',
  [PreStressKeyType.PreStressSteelDiameter]: 'number',
  [PreStressKeyType.PreStressAmount]: 'number',
  [PreStressKeyType.Date]: 'string',
  [PreStressKeyType.Location]: 'LocationType',
  [PreStressKeyType.User]: 'UserType',
};
