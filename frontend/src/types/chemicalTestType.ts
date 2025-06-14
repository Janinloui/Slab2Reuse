import { LocationType } from './locationType';
import { ChemicalTestKeyType } from '../enums/chemicalTestKeyType';
import { ValueType } from './valueType';

export type ChemicalTestType = {
  [ChemicalTestKeyType.CarbonationDepth]: number;
  [ChemicalTestKeyType.ChlorideContent]: number;
  [ChemicalTestKeyType.AlkaliReactivity]: number;
  [ChemicalTestKeyType.Date]: string;
  [ChemicalTestKeyType.UserId]: string;
  [ChemicalTestKeyType.Location]: LocationType;
};

export const ChemicalTestValueMap: Record<ChemicalTestKeyType, ValueType> = {
  [ChemicalTestKeyType.CarbonationDepth]: 'number',
  [ChemicalTestKeyType.ChlorideContent]: 'number',
  [ChemicalTestKeyType.AlkaliReactivity]: 'number',
  [ChemicalTestKeyType.Date]: 'string',
  [ChemicalTestKeyType.UserId]: 'string',
  [ChemicalTestKeyType.Location]: 'LocationType'
};
