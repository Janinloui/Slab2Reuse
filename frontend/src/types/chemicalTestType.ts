import { UserType } from "./userType";
import { LocationType } from "./locationType";

export type ChemicalTestType = {
    id: string;
    carbonationDepth: number;
    chlorideContent: number;
    alkaliReactivity: number;
    date: string;
    user: UserType;
    location: LocationType;
}