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
  dimensions_l: 'mm',
  dimensions_w: 'mm',
  dimensions_h: 'mm',
  liveload: 'kN/m2',
  rebarDiameterTop: 'mm',
  rebarDiameterBottom: 'mm',
  rebarAmountTop: '',
  rebarAmountBottom: '',
};

export const RenderLocal: Record<SlabKeyType | DerivativeAttributeNames | 'edit', string | undefined> = {
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
  [SlabKeyType.ReboundTestData]: undefined,
  [DerivativeAttributeNames.ReboundTestMean]: 'Rebound Mean',
  [DerivativeAttributeNames.ReboundTestStdv]: 'Rebound Stdv',
  [DerivativeAttributeNames.ReboundTestEdit]: 'Rebound Edit',
};

export const AllDefinedRenders: (SlabKeyType | DerivativeAttributeNames | 'edit')[] = [
  ...Object.values(DerivativeAttributeNames),
  ...Object.values(SlabKeyType).filter((s) => RenderLocal[s] !== undefined),
  EditKey,
];

export const locationRenderer = (element: Partial<SlabType>) =>
  element[SlabKeyType.Location_x] !== undefined && element[SlabKeyType.Location_y] !== undefined
    ? element[SlabKeyType.Location_z] !== undefined
      ? `(${element[SlabKeyType.Location_x].toFixed(2)}, ${element[SlabKeyType.Location_y].toFixed(2)}, ${element[SlabKeyType.Location_z]?.toFixed(2)})`
      : `(${element[SlabKeyType.Location_x].toFixed(2)}, ${element[SlabKeyType.Location_y].toFixed(2)})`
    : undefined;
export const rebarRenderer = (element: Partial<SlabType>) =>
  (element[SlabKeyType.RebarAmountBottom] && element[SlabKeyType.RebarDiameterBottom]) ||
  (element[SlabKeyType.RebarAmountTop] && element[SlabKeyType.RebarDiameterTop]) ? (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {element[SlabKeyType.RebarAmountTop] && element[SlabKeyType.RebarDiameterTop] ? (
        <span>
          {`${element[SlabKeyType.RebarAmountTop].toFixed(0)}ø${element[SlabKeyType.RebarDiameterTop].toFixed(1)}`}
          <sub>Top</sub>
        </span>
      ) : null}
      {element[SlabKeyType.RebarAmountBottom] && element[SlabKeyType.RebarDiameterBottom] ? (
        <span>
          {`${element[SlabKeyType.RebarAmountBottom].toFixed(0)}ø${element[SlabKeyType.RebarDiameterBottom].toFixed(1)}`}
          <sub>Bottom</sub>
        </span>
      ) : null}
    </div>
  ) : undefined;

export const DefaultRenderValues: Record<UserCategory, string[]> = {
  [UserCategory.Ubermensch]: AllDefinedRenders,
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

export const getType = (element: Partial<SlabType>) =>
  element[SlabKeyType.Dimensions_l] && element[SlabKeyType.Dimensions_w] && element[SlabKeyType.Dimensions_h]
    ? `${element.typeOfElement} (${element[SlabKeyType.Dimensions_l].toFixed()}, ${element[SlabKeyType.Dimensions_w].toFixed()}, ${element[
        SlabKeyType.Dimensions_h
      ].toFixed()})`
    : undefined;

export const getPartsWithUniqueType = (slabs: Partial<SlabType>[]): Partial<SlabType>[] => {
  const slabMap: { [type: string]: Partial<SlabType> } = {};
  slabs.map((slab) => {
    const localType = getType(slab);
    if (localType !== undefined) slabMap[localType] = slab;
  });

  return Object.values(slabMap);
};

export const getWeight = (element: Partial<SlabType>) =>
  element[SlabKeyType.Dimensions_l] && element[SlabKeyType.Dimensions_w] && element[SlabKeyType.Dimensions_h]
    ? element.dimensions_l * element.dimensions_w * element.dimensions_h * 0.6 * 0.0000025
    : undefined;

export const getReboundTestMean = (element: Partial<SlabType>): number | undefined =>
  element.reboundTestData && element.reboundTestData.length
    ? element.reboundTestData.map((v) => v.reduce((a, b) => a + b / (v.length ?? 1), 0)).reduce((a, b) => a + b / element.reboundTestData!.length, 0)
    : undefined;

export const getReboundTestMaxStandardDeviation = (element: Partial<SlabType>): number | undefined =>
  element.reboundTestData && element.reboundTestData.length
    ? Math.max(
        ...element.reboundTestData.map((v) => {
          const mean = v.reduce((a, b) => a + b / (v.length ?? 1), 0);
          return Math.sqrt(v.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (v.length ?? 1));
        })
      )
    : undefined;
