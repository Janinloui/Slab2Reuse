import { UserKeyType, UserCategory } from '../enums/userKeyType';

export type UserType = {
  [UserKeyType.Id]: string;
  [UserKeyType.Name]: string;
  [UserKeyType.Address]: string;
  [UserKeyType.Company]: string;
  [UserKeyType.Mail]: string;
  userCategory?: UserCategory 
};

import { ValueType } from './valueType';

export const UserTypeValueMap: Record<keyof UserType, ValueType> = {
  [UserKeyType.Id]: 'string',
  [UserKeyType.Name]: 'string',
  [UserKeyType.Address]: 'string',
  [UserKeyType.Company]: 'string',
  [UserKeyType.Mail]: 'string',
  userCategory: 'UserCategory', // Optional field
};



