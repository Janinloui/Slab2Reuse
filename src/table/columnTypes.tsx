import { ColumnType } from 'antd/es/table';
import { SlabType } from '../types/slabType';
import { locationRenderer, RenderLocal, suffixMap, typeRenderer, rebarRenderer, getWeight } from './attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { EditElement } from '../element/EditElement';
import { SlabKeyType } from '../enums/attributeNames';
import { MissingData } from './MissingData';
import { Tag } from 'antd';

// mapping of slab attributes and derived attributes to table column configuration
//Dynamic rendering of columns based on the slab attributes (SlabKeyType) using Object.Values
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
  location: {
    title: RenderLocal['location'],
    key: 'location',
    render: (_, element) => locationRenderer(element) ?? <MissingData />,
  },
  rebarRenderer: {
    title: RenderLocal['rebarRenderer'],
    key: 'rebarRenderer',
    render: (_, element) => rebarRenderer(element) ?? <MissingData />,
  },
  condition: {
    title: RenderLocal[SlabKeyType.Condition],
    key: 'condition',
    render: (_, element) => {
      const condition = element[SlabKeyType.Condition];
      if (condition === 'Good') {
        return (
          <Tag style={{ 
            backgroundColor: '#3CB371', 
            color: 'black', 
            width: '100px', // Fixed width
            height: '30px', // Fixed height
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            Good
          </Tag>
        );
      }
      if (condition === 'Repairable') {
        return (
          <Tag style={{ 
            backgroundColor: '#FFEB3B', 
            color: 'black', 
            width: '100px', 
            height: '30px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            Repairable
          </Tag>
        );
      }
      if (condition === 'Broken') {
        return (
          <Tag style={{ 
            backgroundColor: '#FF6666', 
            color: 'black', 
            width: '100px', 
            height: '30px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}>
            Broken
          </Tag>
        );
      }
      return <MissingData />;
    },
  },
  type: {
    title: RenderLocal['type'],
    key: 'type',
    render: (_, element) => typeRenderer(element) ?? <MissingData />,
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
      return typeof w === 'number' ? `${w.toFixed(0)} kg` : <MissingData />;
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

