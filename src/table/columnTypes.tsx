import { ColumnType } from 'antd/es/table';
import { SlabType } from '../types/slabType';
import { locationRenderer, RenderLocal, suffixMap, typeRenderer, rebarRenderer, getWeight } from './attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { EditElement } from '../element/EditElement';
import { SlabKeyType } from '../enums/attributeNames';

export const columnTypeMap: { [attribute: string]: ColumnType<Partial<SlabType>> } = {
  ...Object.fromEntries(
    Object.values(SlabKeyType).map((dataIndex) => [
      dataIndex,
      {
        title: RenderLocal[dataIndex],
        dataIndex,
        key: dataIndex,
        ...(suffixMap[dataIndex] !== undefined
          ? {
              render: (value) => `${value} ${suffixMap[dataIndex]}`,
              sorter: (a: Partial<SlabType>, b: Partial<SlabType>) => (a[dataIndex] as number) - (b[dataIndex] as number),
            }
          : {
              sorter: (a: Partial<SlabType>, b: Partial<SlabType>) =>
                (a[dataIndex as SlabKeyType] as string).localeCompare(b[dataIndex as SlabKeyType] as string, undefined, { numeric: true }),
            }),
      },
    ])
  ),
  location: {
    title: RenderLocal['location'],
    key: 'location',
    render: (_, element) => locationRenderer(element),
  },
  rebarRenderer: {
    title: RenderLocal['rebarRenderer'],
    key: 'rebarRenderer',
    render: (_, element) => rebarRenderer(element),
  },
  type: {
    title: RenderLocal['type'],
    key: 'type',
    render: (_, element) => typeRenderer(element),
    sorter: (a, b) => {
      const tA = typeRenderer(a);
      const tB = typeRenderer(b);
      if (typeof tA === 'string' && typeof tB === 'string') return tA.localeCompare(tB);
      return -1;
    },
  },
  weight: {
    title: RenderLocal['weight'],
    key: 'weight',
    render: (_, element) => {
      const w = getWeight(element);
      return typeof w === 'number' ? `${w.toFixed(0)} kg` : w;
    },
    sorter: (a, b) => {
      const wA = getWeight(a);
      const wB = getWeight(b);

      if (typeof wA === 'number' && typeof wB === 'number') return wA - wB;
      else return -1;
    },
  },
  count: {
    title: RenderLocal['count'],
    key: 'count',
    render: (_, element) => {
      const elementDerivedType = typeRenderer(element);
      return useTableStore.getState().elements.filter((s) => elementDerivedType === typeRenderer(s)).length;
    },
    sorter: (a, b) =>
      useTableStore.getState().elements.filter((s) => typeRenderer(a) === typeRenderer(s)).length -
      useTableStore.getState().elements.filter((s) => typeRenderer(b) === typeRenderer(s)).length,
  },
  edit: {
    title: RenderLocal['edit'],
    key: 'edit',
    render: (_, element) => <EditElement element={element} />,
  },
};
