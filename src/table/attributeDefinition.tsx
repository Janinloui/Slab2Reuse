import { DerivativeAttributeNames } from '../enums/derivativeAttributeNames';
import { UserCategory } from '../enums/user';
import { SlabKeyType, SlabType } from '../lib/parsingOldData';

const EditKey = 'edit';

//maps atrributes to their respective suffixes (Units)
export const suffixMap: Partial<Record<SlabKeyType | DerivativeAttributeNames, string>> = {
  [SlabKeyType.Location_x]: 'm',
  [SlabKeyType.Location_y]: 'm',
  [SlabKeyType.Floor]: '',
  [DerivativeAttributeNames.Weight]: 'kg',
  [SlabKeyType.Dimensions_l]: 'mm',
  [SlabKeyType.Dimensions_w]: 'mm',
  [SlabKeyType.Dimensions_h]: 'mm',
  [SlabKeyType.Liveload]: 'kN/m2',
  [SlabKeyType.RebarDiameterTop]: 'mm',
  [SlabKeyType.RebarDiameterBottom]: 'mm',
  [SlabKeyType.Yaw]: '°'
};

export const levelRenderer = (level: number | undefined): string | undefined => {
  if (level === undefined) return undefined;
  if (level > 0) return `OG ${level}`;
  if (level === 0) return `EG`;
  return `UG ${Math.abs(level)}`;
};

export const RenderLocal: Record<SlabKeyType | DerivativeAttributeNames | 'edit', string | undefined> = {
  [SlabKeyType.Id]: 'Id',
  [SlabKeyType.PlanReference]: 'Plan Reference',
  [DerivativeAttributeNames.Type]: 'Type',
  [SlabKeyType.Location_x]: 'X Coordinate',
  [SlabKeyType.Location_y]: 'Y Coordinate',
  [SlabKeyType.Floor]: 'Floor',
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
  [SlabKeyType.Condition]: 'Visual Condition',
  [SlabKeyType.Yaw]: 'Yaw',
  [DerivativeAttributeNames.Location]: 'Location',
  [DerivativeAttributeNames.RebarRenderer]: 'Rebar',
  [DerivativeAttributeNames.Count]: 'Count',
  ['edit']: 'Edit Element',
  [SlabKeyType.ReboundTestData]: undefined,
  [DerivativeAttributeNames.ReboundTestMean]: 'Rebound Mean',
  [DerivativeAttributeNames.ReboundTestStdv]: 'Rebound Stdv',
  [DerivativeAttributeNames.ReboundTestEdit]: 'Rebound Edit',
  [SlabKeyType.VisualInspectionImages]: undefined,
  [DerivativeAttributeNames.VisualInspectionImagesDisplay]: 'Visual Inspection'
};

export const AllDefinedRenders: (SlabKeyType | DerivativeAttributeNames | 'edit')[] = [
  ...Object.values(DerivativeAttributeNames),
  ...Object.values(SlabKeyType).filter((s) => RenderLocal[s] !== undefined),
  EditKey
];

export const locationRenderer = (element: Partial<SlabType>) =>
  element[SlabKeyType.Location_x] !== undefined && element[SlabKeyType.Location_y] !== undefined
    ? element[SlabKeyType.Floor] !== undefined
      ? `(${element[SlabKeyType.Location_x].toFixed(2)}, ${element[SlabKeyType.Location_y].toFixed(2)}, ${(0.0).toFixed(2)})`
      : `(${element[SlabKeyType.Location_x].toFixed(2)}, ${element[SlabKeyType.Location_y].toFixed(2)})`
    : undefined;
//renders the rebar of the element in a human readable format (A string) (amount ødiameter)
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

//specifies the default attributes to be displayed for each user category
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
    'edit'
  ],
  [UserCategory.Architect]: [
    DerivativeAttributeNames.Type,
    DerivativeAttributeNames.Count,
    SlabKeyType.PlanReference,
    SlabKeyType.Dimensions_l,
    SlabKeyType.Dimensions_w,
    SlabKeyType.Dimensions_h
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
    SlabKeyType.Condition,
    'edit'
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
    'edit'
  ]
};

export const reduceAndUseCount = [UserCategory.Architect, UserCategory.Client];

export const getType = (element: Partial<SlabType>) =>
  element[SlabKeyType.Dimensions_l] && element[SlabKeyType.Dimensions_w] && element[SlabKeyType.Dimensions_h]
    ? `${element.typeOfElement} (${element[SlabKeyType.Dimensions_l].toFixed()}, ${element[SlabKeyType.Dimensions_w].toFixed()}, ${element[
        SlabKeyType.Dimensions_h
      ].toFixed()})`
    : undefined;

//utiliy function filters slabs to return only unique types
export const getPartsWithUniqueType = (slabs: Partial<SlabType>[]): Partial<SlabType>[] => {
  const slabMap: { [type: string]: Partial<SlabType> } = {};
  slabs.map((slab) => {
    const localType = getType(slab);
    if (localType !== undefined) slabMap[localType] = slab;
  });

  return Object.values(slabMap);
};
//calculates the weight of the element
export const getWeight = (element: Partial<SlabType>) =>
  element[SlabKeyType.Dimensions_l] && element[SlabKeyType.Dimensions_w] && element[SlabKeyType.Dimensions_h]
    ? element.dimensions_l * element.dimensions_w * element.dimensions_h * 0.6 * 0.0000025
    : undefined;

export const getReboundTestMean = (element: Partial<SlabType>): number | undefined =>
  element.reboundTestData && element.reboundTestData.length
    ? element.reboundTestData
        .map((v) => v.reduce((a, b) => a + b / (v.length ?? 1), 0))
        .reduce((a, b) => a + b / element.reboundTestData!.length, 0)
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
