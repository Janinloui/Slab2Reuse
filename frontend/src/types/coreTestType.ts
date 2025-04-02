import { LocationType } from "./locationType";
import { UserType } from "./userType";

export type CoreTestType = {
    id: string;
    coreDiameter: number;
    coreCompressiveStrength: number;
    date: string;
    user: UserType;
    location: LocationType
  };