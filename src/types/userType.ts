enum UserTypeKeys {
    Id = 'userId',
    Name = 'userName',
    Address = 'userAddress',
    Company = 'userCompany',
    Mail = 'userMail'
  }

export enum UserCategory {
    Institution = 'Institution',
    Individual = 'Individual',
    Owner = 'Owner'
    }

export type UserType = {
  [UserTypeKeys.Id]: string;
  [UserTypeKeys.Name]: string;
  [UserTypeKeys.Address]: string;
  [UserTypeKeys.Company]: string;
  [UserTypeKeys.Mail]: string;
  userCategory?: UserCategory 
};

import { ValueType } from './valueType';

export const UserTypeValueMap: Record<keyof UserType, ValueType> = {
  [UserTypeKeys.Id]: 'string',
  [UserTypeKeys.Name]: 'string',
  [UserTypeKeys.Address]: 'string',
  [UserTypeKeys.Company]: 'string',
  [UserTypeKeys.Mail]: 'string',
  userCategory: 'enum', // Optional field
};



