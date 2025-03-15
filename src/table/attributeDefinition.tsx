import { SlabKeyType } from '../enums/attributeNames';
import { DerivativeAttributeNames } from '../enums/derivativeAttributeNames';
import { UserCategory } from '../enums/user';
import { SlabType } from '../types/slabType';

const EditKey = 'edit';

export const suffixMap: Partial<Record<SlabKeyType | DerivativeAttributeNames, string>> = {
  location_x: 'm',
  location_y: 'm',
  location_z: 'm',
  weight: 'kg',
  dimensions_l: 'm',
  dimensions_w: 'm',
  dimensions_h: 'm',
  liveload: 'kN/m2',
  rebarDiameterTop: 'mm',
  rebarDiameterBottom: 'mm',
  rebarAmountTop: '',
  rebarAmountBottom: '',
};

export const AllDefinedRenders: (SlabKeyType | DerivativeAttributeNames | 'edit')[] = [
  ...Object.values(DerivativeAttributeNames),
  ...Object.values(SlabKeyType),
  EditKey,
];
export const RenderLocal: Record<SlabKeyType | DerivativeAttributeNames | 'edit', string> = {
  [SlabKeyType.Id]: 'Id',
  [SlabKeyType.PlanReference]: 'Plan Reference',
  [DerivativeAttributeNames.Type]: 'Type',
  [SlabKeyType.Location_x]: 'X Coordinate',
  [SlabKeyType.Location_y]: 'Y Coordinate',
  [SlabKeyType.Location_z]: 'Z Coordinate',
  [SlabKeyType.Strength]: 'Strength',
  [SlabKeyType.Dimensions_l]: 'Length',
  [SlabKeyType.Dimensions_w]: 'Width',
  [SlabKeyType.Dimensions_h]: 'Height',
  [DerivativeAttributeNames.Weight]: 'Weight',
  [SlabKeyType.Liveload]: 'Live Load',
  [SlabKeyType.TypeOfElement]: 'Element Type',
  [SlabKeyType.RebarDiameterTop]: 'Rebar Diameter Top',
  [SlabKeyType.RebarAmountTop]: 'Rebar Amount Top',
  [SlabKeyType.RebarDiameterBottom]: 'Rebar Diameter Bottom',
  [SlabKeyType.RebarAmountBottom]: 'Rebar Diameter Bottom',
  [DerivativeAttributeNames.Location]: 'Location',
  [DerivativeAttributeNames.RebarRenderer]: 'Rebar',
  [DerivativeAttributeNames.Count]: 'Count',
  ['edit']: 'Edit Element',
};

export const locationRenderer = (element: Partial<SlabType>) =>
  `(${element[SlabKeyType.Location_x]?.toFixed(2)}, ${element[SlabKeyType.Location_y]?.toFixed(2)}, ${element[SlabKeyType.Location_z]?.toFixed(2)})`;
export const rebarRenderer = (element: Partial<SlabType>) =>
  element[SlabKeyType.RebarAmountBottom] &&
  element[SlabKeyType.RebarDiameterBottom] &&
  element[SlabKeyType.RebarAmountTop] &&
  element[SlabKeyType.RebarDiameterTop] ? (
    <>
      <span>
        {`${element[SlabKeyType.RebarAmountBottom].toFixed(0)}ø${element[SlabKeyType.RebarDiameterBottom].toFixed(1)}`}
        <sub>Bottom</sub>
      </span>{' '}
      <span>
        {`${element[SlabKeyType.RebarAmountTop].toFixed(0)}ø${element[SlabKeyType.RebarDiameterTop].toFixed(1)}`}
        <sub>Top</sub>
      </span>
    </>
  ) : (
    'missing data'
  );

export const DefaultRenderValues: Record<UserCategory, string[]> = {
  [UserCategory.Ubermensch]: AllDefinedRenders.filter((s) => AllDefinedRenders.includes(s)),
  [UserCategory.Slab2Reuse]: [
    DerivativeAttributeNames.Type,
    DerivativeAttributeNames.Location,
    DerivativeAttributeNames.Count,
    SlabKeyType.PlanReference,
    SlabKeyType.Dimensions_l,
    SlabKeyType.Dimensions_w,
    SlabKeyType.Dimensions_h,
    'edit',
  ],
  [UserCategory.Architect]: [
    DerivativeAttributeNames.Type,
    DerivativeAttributeNames.Count,
    SlabKeyType.PlanReference,
    SlabKeyType.Dimensions_l,
    SlabKeyType.Dimensions_w,
    SlabKeyType.Dimensions_h,
  ],
  [UserCategory.Engineer]: [
    DerivativeAttributeNames.Type,
    DerivativeAttributeNames.Location,
    DerivativeAttributeNames.Weight,
    SlabKeyType.PlanReference,
    SlabKeyType.Dimensions_l,
    SlabKeyType.Dimensions_h,
    SlabKeyType.Strength,
    SlabKeyType.Liveload,
    'edit',
  ],
  [UserCategory.Client]: [DerivativeAttributeNames.Type, SlabKeyType.TypeOfElement, DerivativeAttributeNames.Count],
  [UserCategory.Contracter]: [
    SlabKeyType.Id,
    DerivativeAttributeNames.Type,
    SlabKeyType.PlanReference,
    DerivativeAttributeNames.Location,
    DerivativeAttributeNames.Weight,
    SlabKeyType.Dimensions_l,
    SlabKeyType.Dimensions_w,
    SlabKeyType.Dimensions_h,
    'edit',
  ],
};

export const reduceAndUseCount = [UserCategory.Architect, UserCategory.Client];

export const typeRenderer = (element: Partial<SlabType>) =>
  element[SlabKeyType.Dimensions_l] && element[SlabKeyType.Dimensions_w] && element[SlabKeyType.Dimensions_h]
    ? `${element.typeOfElement} (${element[SlabKeyType.Dimensions_l].toFixed()}, ${element[SlabKeyType.Dimensions_w].toFixed()}, ${element[
        SlabKeyType.Dimensions_h
      ].toFixed()})`
    : undefined;

export const getPartsWithUniqueType = (slabs: Partial<SlabType>[]): Partial<SlabType>[] => {
  const slabMap: { [type: string]: Partial<SlabType> } = {};
  slabs.map((slab) => {
    const localType = typeRenderer(slab);
    if (localType !== undefined) slabMap[localType] = slab;
  });

  return Object.values(slabMap);
};

export const getWeight = (element: Partial<SlabType>) =>
  element[SlabKeyType.Dimensions_l] && element[SlabKeyType.Dimensions_w] && element[SlabKeyType.Dimensions_h]
    ? element.dimensions_l * element.dimensions_w * element.dimensions_h * 0.6 * 0.0000025
    : undefined;
