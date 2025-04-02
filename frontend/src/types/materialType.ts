import { MaterialCategory } from '../enums/materialCategory';

export type ConcreteType = {
  crossSectionId: string,
  buildingId: string,
  materialCategory: MaterialCategory.Concrete,
  compressiveStrength: number,
  tensileStrength: number,
  elasticModulus: number,
  density: number,
  exposureClass: string,
}

export type TimberType = {
  crossSectionId: string,
  buildingId: string,
  materialCategory: MaterialCategory.Timber,
  fc0k: number,
  ft0k: number,
  fc90k: number,
  ft90k: number,
  elasticModulus: number,
  density: number,
  exposureClass: string,
}