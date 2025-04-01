import { LocationType } from "./locationType";
import { UserType } from "./userType";

export enum ReboundKeyType {
    Id = 'id',
    LocationType = 'locationType',
    ReboundNumber = 'number',
    UserType = 'userType',
    ReboundTestDate = 'sring',
  }
  

export type ReboundTestType = {
  id: string,
  locationType: LocationType,
  reboundNumber: number[], //store multiple values
  userType: UserType,
  reboundTestDate: string,
};


