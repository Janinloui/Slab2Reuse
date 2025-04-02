
import { LocationType } from './locationType';
import { UserType } from './userType';

export type PreStressType = {
    id: string;
    preStressForce: number;
    preStressSteelClass: string;
    preStressSteelDiameter: number;
    preStressAmount: number;
    date: string;
    location: LocationType;
    user: UserType;
    };