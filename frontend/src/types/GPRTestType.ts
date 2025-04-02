import { UserType } from "./userType";
import { ComponentKeyType } from "../enums/componentKeyType";
import { LocationType } from "./locationType";

export type GPRTestType = {
    id: string;
    rebarDiameter: number;
    coverDepth: number;
    rebarAmount: number;
    date: string;
    user: UserType;
    location: LocationType;
  }
