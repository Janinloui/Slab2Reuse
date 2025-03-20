import { ColumnType } from 'antd/es/table';
import { SlabType } from '../types/slabType';
import {
  locationRenderer,
  RenderLocal,
  suffixMap,
  getType,
  rebarRenderer,
  getWeight,
  getReboundTestMean,
  getReboundTestMaxStandardDeviation,
  levelRenderer,
} from './attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { EditElement } from '../element/EditElement';
import { SlabKeyType } from '../enums/attributeNames';
import { MissingData } from './MissingData';
import { DerivativeAttributeNames } from '../enums/derivativeAttributeNames';
import { EditReboundTestData } from '../element/EditReboundTestData';
import { VisualConditionTag } from './VisualConditionTag';

// mapping of slab attributes and derived attributes to table column configuration
//Dynamic rendering of columns based on the slab attributes (SlabKeyType) using Object.Values

const derivativeColumnTypeMap: Record<DerivativeAttributeNames, ColumnType<Partial<SlabType>>> = {
  [DerivativeAttributeNames.Location]: {
    title: RenderLocal[DerivativeAttributeNames.Location],
    key: DerivativeAttributeNames.Location,
    render: (_, element) => locationRenderer(element) ?? <MissingData key={element.id + DerivativeAttributeNames.Location} />,
  },
  [DerivativeAttributeNames.RebarRenderer]: {
    title: RenderLocal[DerivativeAttributeNames.RebarRenderer],
    key: DerivativeAttributeNames.RebarRenderer,
    render: (_, element) => rebarRenderer(element) ?? <MissingData key={element.id + DerivativeAttributeNames.RebarRenderer} />,
  },
  [DerivativeAttributeNames.Type]: {
    title: RenderLocal[DerivativeAttributeNames.Type],
    key: DerivativeAttributeNames.Type,
    render: (_, element) => getType(element) ?? <MissingData key={element.id + DerivativeAttributeNames.Type} />,
    sorter: (a, b) => {
      const tA = getType(a);
      const tB = getType(b);
      if (tA !== undefined && tB !== undefined) return tA.localeCompare(tB);
      return -1;
    },
  },
  [DerivativeAttributeNames.Weight]: {
    title: RenderLocal[DerivativeAttributeNames.Weight],
    key: DerivativeAttributeNames.Weight,
    render: (_, element) => {
      const w = getWeight(element);
      return typeof w === 'number' ? `${w.toFixed(0)} kg` : <MissingData key={element.id + DerivativeAttributeNames.Weight} />;
    },
    sorter: (a, b) => {
      const wA = getWeight(a);
      const wB = getWeight(b);

      if (wA !== undefined && wB !== undefined) return wA - wB;
      else return -1;
    },
  },
  [DerivativeAttributeNames.Count]: {
    title: RenderLocal[DerivativeAttributeNames.Count],
    key: DerivativeAttributeNames.Count,
    render: (_, element) => {
      const elementDerivedType = getType(element);
      return useTableStore.getState().elements.filter((s) => elementDerivedType === getType(s)).length;
    },
    sorter: (a, b) =>
      useTableStore.getState().elements.filter((s) => getType(a) === getType(s)).length -
      useTableStore.getState().elements.filter((s) => getType(b) === getType(s)).length,
  },
  [DerivativeAttributeNames.ReboundTestMean]: {
    title: RenderLocal[DerivativeAttributeNames.ReboundTestMean],
    key: DerivativeAttributeNames.ReboundTestMean,
    render: (_, element) => {
      const mean = getReboundTestMean(element);
      return mean !== undefined ? `${mean.toFixed(0)} MPa` : <MissingData key={element.id + DerivativeAttributeNames.ReboundTestMean} />;
    },
    sorter: (a, b) => {
      const mA = getReboundTestMean(a);
      const mB = getReboundTestMean(b);

      if (mA !== undefined && mB !== undefined) return mA - mB;
      else return -1;
    },
  },
  [DerivativeAttributeNames.ReboundTestStdv]: {
    title: RenderLocal[DerivativeAttributeNames.ReboundTestStdv],
    key: DerivativeAttributeNames.ReboundTestStdv,
    render: (_, element) => {
      const stdv = getReboundTestMaxStandardDeviation(element);
      return stdv !== undefined ? `${stdv.toFixed(0)} MPa` : <MissingData key={element.id + DerivativeAttributeNames.ReboundTestStdv} />;
    },
    sorter: (a, b) => {
      const sA = getReboundTestMaxStandardDeviation(a);
      const sB = getReboundTestMaxStandardDeviation(b);

      if (sA !== undefined && sB !== undefined) return sA - sB;
      else return -1;
    },
  },
  [DerivativeAttributeNames.ReboundTestEdit]: {
    title: RenderLocal[DerivativeAttributeNames.ReboundTestEdit],
    key: DerivativeAttributeNames.ReboundTestEdit,
    render: (_, element) => <EditReboundTestData element={element} />,
  },
};

export const ColumnTypeMap: { [attribute: string]: ColumnType<Partial<SlabType>> } = {
  ...Object.fromEntries(
    Object.values(SlabKeyType).map((dataIndex) => [
      dataIndex,
      {
        title: RenderLocal[dataIndex],
        dataIndex,
        key: dataIndex,
        ...(suffixMap[dataIndex] !== undefined
          ? {
              render: (value, e) => (value !== undefined && !Number.isNaN(value) ? `${value} ${suffixMap[dataIndex]}` : <MissingData key={e.id + dataIndex} />),
              sorter: (a: Partial<SlabType>, b: Partial<SlabType>) => ((a[dataIndex] as number) || 0) - ((b[dataIndex] as number) || 0),
            }
          : {
              render: (value, e) => (value !== undefined ? value : <MissingData key={e.id + dataIndex} />),
              sorter: (a: Partial<SlabType>, b: Partial<SlabType>) =>
                (a[dataIndex as SlabKeyType] as string).localeCompare(b[dataIndex as SlabKeyType] as string, undefined, { numeric: true }),
            }),
      },
    ])
  ),
  [SlabKeyType.Condition]: {
    dataIndex: SlabKeyType.Condition,
    title: RenderLocal[SlabKeyType.Condition],
    key: 'condition',
    render: (condition, element) => (condition ? <VisualConditionTag condition={condition} /> : <MissingData key={element.id + SlabKeyType.Condition} />),
  },
  [SlabKeyType.Floor]: {
    dataIndex: SlabKeyType.Floor,
    title: RenderLocal[SlabKeyType.Floor],
    key: 'floor',
    render: (value, e) => (value !== undefined ? levelRenderer(value) : <MissingData key={e.id + SlabKeyType.Floor} />),
    sorter: (a: Partial<SlabType>, b: Partial<SlabType>) => (a[SlabKeyType.Floor] ?? 0) - (b[SlabKeyType.Floor] ?? 0),
  },
  ...derivativeColumnTypeMap,
  edit: {
    title: RenderLocal['edit'],
    key: 'edit',
    render: (_, element) => <EditElement element={element} />,
  },
};
