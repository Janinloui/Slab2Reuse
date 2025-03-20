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
} from './attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { EditElement } from '../element/EditElement';
import { SlabKeyType } from '../enums/attributeNames';
import { MissingData } from './MissingData';
import { DerivativeAttributeNames } from '../enums/derivativeAttributeNames';
import { EditReboundTestData } from '../element/EditReboundTestData';

const derivativeColumnTypeMap: Record<DerivativeAttributeNames, ColumnType<Partial<SlabType>>> = {
  [DerivativeAttributeNames.Location]: {
    title: RenderLocal[DerivativeAttributeNames.Location],
    key: DerivativeAttributeNames.Location,
    render: (_, element) => locationRenderer(element) ?? <MissingData />,
  },
  [DerivativeAttributeNames.RebarRenderer]: {
    title: RenderLocal[DerivativeAttributeNames.RebarRenderer],
    key: DerivativeAttributeNames.RebarRenderer,
    render: (_, element) => rebarRenderer(element) ?? <MissingData />,
  },
  [DerivativeAttributeNames.Type]: {
    title: RenderLocal[DerivativeAttributeNames.Type],
    key: DerivativeAttributeNames.Type,
    render: (_, element) => getType(element) ?? <MissingData />,
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
      return typeof w === 'number' ? `${w.toFixed(0)} kg` : <MissingData />;
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
      return mean !== undefined ? `${mean.toFixed(0)} MPa` : <MissingData />;
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
      return stdv !== undefined ? `${stdv.toFixed(0)} MPa` : <MissingData />;
    },
    sorter: (a, b) => {
      const sA = getReboundTestMaxStandardDeviation(a);
      const sB = getReboundTestMaxStandardDeviation(b);

      if (sA !== undefined && sB !== undefined) return sA - sB;
      else return -1;
    },
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
              render: (value) => (value !== undefined && !Number.isNaN(value) ? `${value} ${suffixMap[dataIndex]}` : <MissingData />),
              sorter: (a: Partial<SlabType>, b: Partial<SlabType>) => (a[dataIndex] as number) - (b[dataIndex] as number),
            }
          : {
              render: (value) => (value !== undefined ? value : <MissingData />),
              sorter: (a: Partial<SlabType>, b: Partial<SlabType>) =>
                (a[dataIndex as SlabKeyType] as string).localeCompare(b[dataIndex as SlabKeyType] as string, undefined, { numeric: true }),
            }),
      },
    ])
  ),
  ...derivativeColumnTypeMap,
  edit: {
    title: RenderLocal['edit'],
    key: 'edit',
    render: (_, element) => <EditElement element={element} />,
  },
};
