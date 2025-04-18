import { ComponentTest } from '../enums/componentTest';
import { PreStressStrandKeyType } from '../enums/preStressStrandKeyType';
import { PreStressStrandType } from './preStressStrandType';

export const SelectedPreStressStrandKeys = [
  PreStressStrandKeyType.PreStressSteelClass,
  PreStressStrandKeyType.PreStressForce,
  PreStressStrandKeyType.PreStressSteelDiameter,
  PreStressStrandKeyType.PreStressAmount
] as const;

export type TestDataForGeometryType = {
  [ComponentTest.ChemcicalTest]: {};
  [ComponentTest.Core]: {
    average: number;
    stdv: number;
  };
  [ComponentTest.Destructive]: {
    shearStrength: number;
    compressiveStrength: number;
    tensileStrength: number;
    youngsModulus: number;
    momentCapacity: number;
    shearCapacity: number;
    normalCapacity: number;
    density: number;
  };
  [ComponentTest.GPR]: {
    rebarDiameter: number;
    rebarAmount: number;
    coverDepth: number;
  };
  [ComponentTest.Rebound]: {
    average: number;
    stdv: number;
  };
  [ComponentTest.PreStressStrand]: Pick<PreStressStrandType, (typeof SelectedPreStressStrandKeys)[number]>;
};
