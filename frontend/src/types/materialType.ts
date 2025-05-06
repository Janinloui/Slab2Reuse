import { MaterialCategory } from '../enums/materialCategory';
import { MaterialKeyType } from '../enums/materialKeyType';
import { ValueType } from './valueType';

export type ConcreteType = {
  [MaterialKeyType.Id]: string;
  [MaterialKeyType.CrossSectionId]: string;
  [MaterialKeyType.MaterialCategory]: MaterialCategory.Concrete;
  [MaterialKeyType.CompressiveStrength]: number;
  [MaterialKeyType.TensileStrength]: number;
  [MaterialKeyType.ElasticModulus]: number;
  [MaterialKeyType.Density]: number;
  [MaterialKeyType.ExposureClass]: string;
};

export type TimberType = {
  [MaterialKeyType.Id]: string;
  [MaterialKeyType.CrossSectionId]: string;
  [MaterialKeyType.MaterialCategory]: MaterialCategory.Timber;
  [MaterialKeyType.Fc0k]: number;
  [MaterialKeyType.Ft0k]: number;
  [MaterialKeyType.Fc90k]: number;
  [MaterialKeyType.Ft90k]: number;
  [MaterialKeyType.ElasticModulus]: number;
  [MaterialKeyType.Density]: number;
  [MaterialKeyType.ExposureClass]: string;
};

export type MaterialType = ConcreteType | TimberType;

export const MaterialValueMap: Record<MaterialKeyType, ValueType> = {
  [MaterialKeyType.Id]: 'string',
  [MaterialKeyType.CrossSectionId]: 'string',
  [MaterialKeyType.MaterialCategory]: 'MaterialCategory',
  [MaterialKeyType.CompressiveStrength]: 'number',
  [MaterialKeyType.TensileStrength]: 'number',
  [MaterialKeyType.ElasticModulus]: 'number',
  [MaterialKeyType.Density]: 'number',
  [MaterialKeyType.ExposureClass]: 'string',
  [MaterialKeyType.Fc0k]: 'number',
  [MaterialKeyType.Ft0k]: 'number',
  [MaterialKeyType.Fc90k]: 'number',
  [MaterialKeyType.Ft90k]: 'number',
};
