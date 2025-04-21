//standardized attribute names for a component

export enum ComponentKeyType {
  Id = 'id',
  Img = 'img',
  Condition = 'condition',
  NoHarmfulSubstance = 'noHarmfulSubstance',
  AvailableFrom = 'availableFrom',
  Buyer = 'buyer',
  Price = 'price',
  PlanReference = 'planReference',
  LoadingCondition = 'loadingCondition',
  Yaw = 'yaw',
  Floor = 'floor',
  Location = 'locationType',
  VisualInspection = 'visualInspection',
  ManufacturerId = 'manufacturerId',
  GeometryTypeId = 'geometryTypeId',
  DestructiveTest = 'destructiveTest',
  CoreTest = 'coreTest',
  ChemicalTest = 'chemicalTest',
  GPRTest = 'gprTest',
  ReboundTest = 'reboundTest',
  BuildingId = 'componentBuildingId',
  Liveload = 'componentLiveload'
}

export const ComponentTestKeys = [
  ComponentKeyType.DestructiveTest,
  ComponentKeyType.CoreTest,
  ComponentKeyType.ChemicalTest,
  ComponentKeyType.GPRTest,
  ComponentKeyType.ReboundTest
] as const;

export type ComponentTestKeyType = (typeof ComponentTestKeys)[number];