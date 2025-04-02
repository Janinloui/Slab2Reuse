import { UserType } from "./userType";
import { LocationType } from "./locationType";

export type VisualInspectionType = {
    img: string;
    damageType: string;
    date: string;
    user: UserType;
    location: LocationType;
}
