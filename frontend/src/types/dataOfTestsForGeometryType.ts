import { ChemicalTestKeyType } from '../enums/chemicalTestKeyType';
import { ComponentKeyType } from '../enums/componentKeyType';
import { ComponentTest } from '../enums/componentTest';
import { CoreTestKeyType } from '../enums/coreTestKeyType';
import { DestructiveTestKeyType } from '../enums/destructiveTestKeyType';
import { GPRTestKeyType } from '../enums/gprTestKeyType';
import { PreStressStrandKeyType } from '../enums/preStressStrandKeyType';
import { ReboundTestKeyType } from '../enums/reboundTestKeyType';
import { PreStressStrandType } from './preStressStrandType';
import { ValueType } from './valueType';

export type DerivedTestData = {
  average: number;
  stdv: number;
  median: number;
  totalTests: number;
  totalComponentsTested: number;
};

export const DerivedTestKeyValueMap: Record<keyof DerivedTestData, ValueType> = {
  average: 'number',
  stdv: 'number',
  median: 'number',
  totalTests: 'number',
  totalComponentsTested: 'number'
};

export const SelectedChemicalTestKeys = [
  ChemicalTestKeyType.AlkaliReactivity,
  ChemicalTestKeyType.CarbonationDepth,
  ChemicalTestKeyType.ChlorideContent
];

export const SelectedCoreTestKeys = [CoreTestKeyType.CoreCompressiveStrength, CoreTestKeyType.CoreDiameter] as const;

export const SelectedGPRTestKeys = [
  GPRTestKeyType.RebarDiameter,
  GPRTestKeyType.RebarAmount,
  GPRTestKeyType.CoverDepth
] as const;

export const SelectedReboundTestKeys = [ReboundTestKeyType.ReboundValue] as const;

export const SelectedDestructiveTestKeys = [
  DestructiveTestKeyType.ShearStrength,
  DestructiveTestKeyType.CompressiveStrength,
  DestructiveTestKeyType.TensileStrength,
  DestructiveTestKeyType.YoungsModulus,
  DestructiveTestKeyType.MomentCapacity,
  DestructiveTestKeyType.ShearCapacity,
  DestructiveTestKeyType.NormalCapacity,
  DestructiveTestKeyType.Density
] as const;

export const SelectedPreStressStrandKeys = [
  PreStressStrandKeyType.PreStressSteelClass,
  PreStressStrandKeyType.PreStressForce,
  PreStressStrandKeyType.PreStressSteelDiameter,
  PreStressStrandKeyType.PreStressAmount
] as const;

export type DerivedDataOfTestsForGeometryType = {
  [ComponentTest.ChemicalTest]: Record<(typeof SelectedChemicalTestKeys)[number], DerivedTestData> & {
    componentIds: string[];
  };
  [ComponentTest.Core]: Record<(typeof SelectedCoreTestKeys)[number], DerivedTestData> & { componentIds: string[] };
  [ComponentTest.Destructive]: Record<(typeof SelectedDestructiveTestKeys)[number], DerivedTestData> & {
    componentIds: string[];
  };
  [ComponentTest.GPR]: Record<(typeof SelectedGPRTestKeys)[number], DerivedTestData> & { componentIds: string[] };
  [ComponentTest.Rebound]: Record<(typeof SelectedReboundTestKeys)[number], DerivedTestData> & {
    componentIds: string[];
  };
  [ComponentTest.PreStressStrand]: Pick<PreStressStrandType, (typeof SelectedPreStressStrandKeys)[number]>;
};

export const SingularTestKeyMap = {
  [ComponentKeyType.DestructiveTest]: SelectedDestructiveTestKeys,
  [ComponentKeyType.CoreTest]: SelectedCoreTestKeys,
  [ComponentKeyType.ChemicalTest]: SelectedChemicalTestKeys,
  [ComponentKeyType.GPRTest]: SelectedGPRTestKeys
};

export const MultiTestKeys = [
  ...SelectedChemicalTestKeys,
  ...SelectedCoreTestKeys,
  ...SelectedGPRTestKeys,
  ...SelectedReboundTestKeys,
  ...SelectedDestructiveTestKeys
] as const;

export type MultiTestKeysType = (typeof MultiTestKeys)[number];

export const getComponentTestKeyForKey: Record<MultiTestKeysType, ComponentTest> = Object.fromEntries([
  ...SelectedChemicalTestKeys.map((k) => [k, ComponentKeyType.ChemicalTest]),
  ...SelectedCoreTestKeys.map((k) => [k, ComponentKeyType.CoreTest]),
  ...SelectedDestructiveTestKeys.map((k) => [k, ComponentKeyType.DestructiveTest]),
  ...SelectedGPRTestKeys.map((k) => [k, ComponentKeyType.GPRTest]),
  ...SelectedReboundTestKeys.map((k) => [k, ComponentKeyType.ReboundTest])
]);
