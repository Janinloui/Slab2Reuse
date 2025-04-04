import { UserCategory } from '../enums/userCategory';
import { UserKeyType } from '../enums/userKeyType';
import { ValueType } from './valueType';

export type UserType = {
  [UserKeyType.Id]: string;
  [UserKeyType.Name]: string;
  [UserKeyType.Address]: string;
  [UserKeyType.Company]: string;
  [UserKeyType.Mail]: string;
  [UserKeyType.UserCategory]: UserCategory;
};

export const UserValueMap: Record<keyof UserType, ValueType> = {
  [UserKeyType.Id]: 'string',
  [UserKeyType.Name]: 'string',
  [UserKeyType.Address]: 'string',
  [UserKeyType.Company]: 'string',
  [UserKeyType.Mail]: 'string',
  [UserKeyType.UserCategory]: 'UserCategory',
};
