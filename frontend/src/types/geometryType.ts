import { ComponentCategory } from '../enums/componentCategory';

export type SlabType = {
  crossSectionId: string,
  componentCategory: ComponentCategory.Slab
  buildingId: string,
  length: number,
}

export type ColumnType = {
  crossSectionId: string,
  componentCategory: ComponentCategory.Column
  buildingId: string,
  height: number,
}