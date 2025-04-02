import { LocationType } from "./locationType";
import { UserType } from "./userType";
import { ReboundKeyType } from "../enums/reboundKeyType";

export type ReboundTestType = {
  [ReboundKeyType.Id]: string,
  [ReboundKeyType.ReboundNumber]: number[], //store multiple values
  [ReboundKeyType.ReboundTestDate]: string,
  userType: UserType,
  locationType: LocationType,
};


