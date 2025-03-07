import { ColumnType } from 'antd/es/table';
import { SlabType } from '../types/slabType';
import { locationRenderer, PartTypeKeys, RenderLocal, suffixMap, typeRenderer, rebarRenderer, getWeight } from './attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { EditElement } from '../element/EditElement';

export const columnTypeMap: { [attribute: string]: ColumnType<SlabType> } = {
  ...Object.fromEntries(
    PartTypeKeys.map((dataIndex) => [
      dataIndex,
      {
        title: RenderLocal[dataIndex],
        dataIndex,
        key: dataIndex,
        ...(suffixMap[dataIndex] !== undefined
          ? {
              render: (value) => `${value} ${suffixMap[dataIndex]}`,
              sorter: (a: SlabType, b: SlabType) => ((a[dataIndex as keyof SlabType] as number) - b[dataIndex as keyof SlabType]) as number,
            }
          : {
              sorter: (a: SlabType, b: SlabType) =>
                (a[dataIndex as keyof SlabType] as string).localeCompare(b[dataIndex as keyof SlabType] as string, undefined, { numeric: true }),
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
    sorter: (a, b) => typeRenderer(a).localeCompare(typeRenderer(b)),
  },
  weight: {
    title: RenderLocal['weight'],
    key: 'weight',
    render: (_, element) => `${getWeight(element).toFixed(0)} kg`,
    sorter: (a, b) => getWeight(a) - getWeight(b),
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
