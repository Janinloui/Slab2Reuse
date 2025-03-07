import { UserCategory } from '../enums/user';
import { SlabType } from '../types/slabType';

const CostumUIKeys = ['location', 'rebarRenderer', 'type', 'weight', 'count'];
export const PartTypeKeys = [
  'id',
  'planReference',
  'location_x',
  'location_y',
  'location_z',
  'strength',
  'dimensions_l',
  'dimensions_w',
  'dimensions_h',
  'liveload',
  'typeOfElement',
  'rebarDiameterTop',
  'rebarAmountTop',
  'rebarDiameterBottom',
  'rebarAmountBottom',
];
const EditKey = 'edit';

export const suffixMap: Record<string, string> = {
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

export const AllDefinedRenders = [...CostumUIKeys, ...PartTypeKeys, EditKey];
export const RenderLocal: Record<string, string> = {
  id: 'Id',
  planReference: 'Plan Reference',
  type: 'Type',
  location_x: 'X Coordinate',
  location_y: 'Y Coordinate',
  location_z: 'Z Coordinate',
  strength: 'Strength',
  dimensions_l: 'Length',
  dimensions_w: 'Width',
  dimensions_h: 'Height',
  weight: 'Weight',
  liveload: 'Live Load',
  typeOfElement: 'Element Type',
  rebarDiameterTop: 'Rebar Diameter Top',
  rebarAmountTop: 'Rebar Amount Top',
  rebarDiameterBottom: 'Rebar Diameter Bottom',
  rebarAmountBottom: 'Rebar Diameter Bottom',
  location: 'Location',
  rebarRenderer: 'Rebar',
  count: 'Count',
  edit: 'Edit Element',
};

export const locationRenderer = (element: SlabType) => `(${element.location_x.toFixed(2)}, ${element.location_y.toFixed(2)}, ${element.location_z.toFixed(2)})`;
export const rebarRenderer = (element: SlabType) => (
  <>
    <span>
      {`${element.rebarAmountBottom.toFixed(0)}ø${element.rebarDiameterBottom.toFixed(1)}`}
      <sub>Bottom</sub>
    </span>{' '}
    <span>
      {`${element.rebarAmountTop.toFixed(0)}ø${element.rebarDiameterTop.toFixed(1)}`}
      <sub>Top</sub>
    </span>
  </>
);

export const DefaultRenderValues: Record<UserCategory, string[]> = {
  [UserCategory.Ubermensch]: AllDefinedRenders.filter((s) => AllDefinedRenders.includes(s)),
  [UserCategory.Architect]: ['type', 'count', 'planReference', 'dimensions_l', 'dimensions_w', 'dimensions_h'].filter((s) => AllDefinedRenders.includes(s)),
  [UserCategory.Engineer]: ['type', 'location', 'weight', 'planReference', 'dimensions_l', 'dimensions_h', 'strength', 'liveload', 'edit'].filter((s) =>
    AllDefinedRenders.includes(s)
  ),
  [UserCategory.Client]: ['type', 'typeOfElement', 'count'].filter((s) => AllDefinedRenders.includes(s)),
  [UserCategory.Contracter]: ['id', 'type', 'planReference', 'location', 'weight', 'dimensions_l', 'dimensions_w', 'dimensions_h', 'edit'],
};

export const reduceAndUseCount = [UserCategory.Architect, UserCategory.Client];

export const typeRenderer = (element: SlabType) =>
  `${element.typeOfElement} (${element.dimensions_l.toFixed()}, ${element.dimensions_w.toFixed()}, ${element.dimensions_h.toFixed()})`;

export const getPartsWithUniqueType = (slabs: SlabType[]): SlabType[] => {
  const slabMap: { [type: string]: SlabType } = {};
  slabs.map((slab) => {
    slabMap[typeRenderer(slab)] = slab;
  });

  return Object.values(slabMap);
};

export const getWeight = (element: SlabType) => element.dimensions_l * element.dimensions_w * element.dimensions_h * 0.6 * 0.0000025;
