import { getColumTypeForEnums } from './getColumTypeForEnums';
import { ComponentKeyType } from '../../enums/componentKeyType';
import { ComponentType } from '../../types/componentType';
import { ColumnType } from 'antd/es/table';
import { ComponentDerivedAttributes } from '../../enums/componentDerivedAttributes';
import { CollectionName } from '../../enums/collectionName';
import { useCollectionStore } from '../../state/collectionStore';
import { GeometryKeyType } from '../../enums/geometryKeyType';
import { MissingData } from '../MissingData';
import { ComponentCategory } from '../../enums/componentCategory';
import { EntryRenderer, GenericUIRenderer } from '../../generic/GenericUIRenderer';
import { GeometryType } from '../../types/geometryType';
import { CrossSectionKeyType } from '../../enums/crossSectionKeyType';
import { CrossSectionType } from '../../types/crossSectionType';
import { getEntry } from './componentDataMethod';
import {
  DerivedTestData,
  SelectedPreStressStrandKeys,
  getComponentTestKeyForKey,
  MultiTestKeys,
  MultiTestKeysType
} from '../../types/dataOfTestsForGeometryType';
import { useTableStore } from '../../state/tableStore';
import { Button, Popover } from 'antd';
import { ComponentTest } from '../../enums/componentTest';
import { VisualConditionTag } from '../VisualConditionTag';
import { VisualCondition } from '../../enums/visualCondition';
import { getLocalCoordinates } from '../../lib/locationMapping';
import { xyzToWebgl } from '../../webgl/utils/coordinateSystem';
import { BuildingType } from '../../types/buildingType';
import { MaterialKeyType } from '../../enums/materialKeyType';
import { MaterialType } from '../../types/materialType';

const WEIGHT_MULTIPLIER = 2.6;

export const levelRenderer = (level: number | undefined): string | undefined => {
  if (level === undefined) return undefined;
  if (level > 0) return `OG ${level}`;
  if (level === 0) return `EG`;
  return `UG ${Math.abs(level)}`;
};

const simpleComponentColumns = {
  ...getColumTypeForEnums<ComponentType>(Object.values(ComponentKeyType)),
  [ComponentKeyType.Floor]: {
    dataIndex: ComponentKeyType.Floor,
    title: ComponentKeyType.Floor,
    render: (value: number, e: ComponentType) =>
      value !== undefined ? levelRenderer(value) : <MissingData key={e.id + ComponentKeyType.Floor} />
  },
  [ComponentKeyType.Condition]: {
    dataIndex: ComponentKeyType.Condition,
    title: ComponentKeyType.Condition,
    render: (condition: VisualCondition, element: ComponentType) =>
      condition ? (
        <VisualConditionTag condition={condition} />
      ) : (
        <MissingData key={element.id + ComponentKeyType.Condition} />
      )
  }
};

const getComponentCategory = (geometryTypeId: string) => {
  const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
  if (!geometry) return <MissingData reason='geometry not found' />;
  return (
    <EntryRenderer
      k={geometry[GeometryKeyType.ComponentCategory]}
      valueType={'string'}
      value={geometry[GeometryKeyType.ComponentCategory]}
    />
  );
};

const getWidthForGeometryType = (geometryTypeId: string, canChange: boolean) => {
  const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
  if (!geometry) return <MissingData reason='geometry not found' />;
  const crossSection = getEntry<CrossSectionType>(
    CollectionName.CrossSections,
    geometry[GeometryKeyType.CrossSectionId]
  );
  if (!crossSection) return <MissingData reason='cross section not found' />;
  return (
    <EntryRenderer
      k={ComponentDerivedAttributes.Width}
      valueType={'number'}
      value={crossSection[CrossSectionKeyType.Width]}
      onChange={
        canChange
          ? (v) =>
              useCollectionStore.getState().updateEntry(CollectionName.CrossSections, {
                ...crossSection,
                [CrossSectionKeyType.Width]: v as number
              })
          : undefined
      }
    />
  );
};

const getLengthForGeometryType = (geometryTypeId: string, canChange: boolean) => {
  const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
  if (!geometry) return <MissingData reason='geometry not found' />;
  if (geometry[GeometryKeyType.ComponentCategory] !== ComponentCategory.Slab) {
    const crossSection = getEntry<CrossSectionType>(
      CollectionName.CrossSections,
      geometry[GeometryKeyType.CrossSectionId]
    );
    if (!crossSection) return <MissingData reason='cross section not found' />;
    return (
      <EntryRenderer
        k={ComponentDerivedAttributes.Length}
        valueType={'number'}
        value={crossSection[CrossSectionKeyType.Height]}
        onChange={
          canChange
            ? (v) =>
                useCollectionStore.getState().updateEntry(CollectionName.CrossSections, {
                  ...crossSection,
                  [CrossSectionKeyType.Height]: v as number
                })
            : undefined
        }
      />
    );
  }
  return (
    <EntryRenderer
      k={ComponentDerivedAttributes.Length}
      valueType={'number'}
      value={geometry[GeometryKeyType.Length]}
      onChange={
        canChange
          ? (v) =>
              useCollectionStore.getState().updateEntry(CollectionName.Geometries, {
                ...geometry,
                [GeometryKeyType.Length]: v as number
              })
          : undefined
      }
    />
  );
};

const getHeightForGeometryType = (geometryTypeId: string, canChange: boolean) => {
  const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
  if (!geometry) return <MissingData reason='geometry not found' />;
  if (geometry[GeometryKeyType.ComponentCategory] === ComponentCategory.Slab) {
    const crossSection = getEntry<CrossSectionType>(
      CollectionName.CrossSections,
      geometry[GeometryKeyType.CrossSectionId]
    );
    if (!crossSection) return <MissingData reason='cross section not found' />;
    return (
      <EntryRenderer
        k={ComponentDerivedAttributes.Height}
        valueType={'number'}
        value={crossSection[CrossSectionKeyType.Height]}
        onChange={
          canChange
            ? (v) =>
                useCollectionStore.getState().updateEntry(CollectionName.CrossSections, {
                  ...crossSection,
                  [CrossSectionKeyType.Height]: v as number
                })
            : undefined
        }
      />
    );
  }
  return (
    <EntryRenderer
      k={ComponentDerivedAttributes.Height}
      valueType={'number'}
      value={geometry[GeometryKeyType.Height]}
      onChange={
        canChange
          ? (v) =>
              useCollectionStore.getState().updateEntry(CollectionName.Geometries, {
                ...geometry,
                [GeometryKeyType.Height]: v as number
              })
          : undefined
      }
    />
  );
};

const getVolumeForGeometryType = (geometryTypeId: string) => {
  const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
  if (!geometry) return <MissingData reason='geometry not found' />;
  const crossSection = getEntry<CrossSectionType>(
    CollectionName.CrossSections,
    geometry[GeometryKeyType.CrossSectionId]
  );
  if (!crossSection) return <MissingData reason='cross section not found' />;
  const cxW = crossSection[CrossSectionKeyType.Width];
  const cxH = crossSection[CrossSectionKeyType.Height];
  const length =
    geometry[GeometryKeyType.ComponentCategory] === ComponentCategory.Slab
      ? geometry[GeometryKeyType.Length]
      : geometry[GeometryKeyType.Height];

  return <EntryRenderer k={ComponentDerivedAttributes.Volume} valueType={'number'} value={cxW * cxH * length} />;
};

const getWeightForGeometryType = (geometryTypeId: string) => {
  const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
  if (!geometry) return <MissingData reason='geometry not found' />;
  const crossSection = getEntry<CrossSectionType>(
    CollectionName.CrossSections,
    geometry[GeometryKeyType.CrossSectionId]
  );
  if (!crossSection) return <MissingData reason='cross section not found' />;
  const cxW = crossSection[CrossSectionKeyType.Width];
  const cxH = crossSection[CrossSectionKeyType.Height];
  const length =
    geometry[GeometryKeyType.ComponentCategory] === ComponentCategory.Slab
      ? geometry[GeometryKeyType.Length]
      : geometry[GeometryKeyType.Height];

  return (
    <EntryRenderer
      k={ComponentDerivedAttributes.Weight}
      valueType={'number'}
      value={cxW * cxH * length * WEIGHT_MULTIPLIER}
    />
  );
};

const getCountForGeometryType = (geometryTypeId: string) => (
  <EntryRenderer
    k={ComponentDerivedAttributes.Count}
    valueType={'number'}
    value={useCollectionStore
      .getState()
      .collections[
        CollectionName.Components
      ].reduce((count, component) => (component[ComponentKeyType.GeometryTypeId] === geometryTypeId ? count + 1 : count), 0)}
  />
);

const getDataForTestKey = (
  geometryTypeId: string,
  testKey: MultiTestKeysType
): undefined | [string[], DerivedTestData] => {
  const derivedData = useTableStore.getState().derivedTestData;
  return derivedData[geometryTypeId] && derivedData[geometryTypeId][getComponentTestKeyForKey[testKey]]
    ? [
        (derivedData[geometryTypeId][getComponentTestKeyForKey[testKey]] as any).componentIds,
        (derivedData[geometryTypeId][getComponentTestKeyForKey[testKey]] as any)[testKey] as DerivedTestData
      ]
    : undefined;
};

const SimpleDerivedTestDataRenderer = (testKey: MultiTestKeysType, data: DerivedTestData, componentIds: string[]) => (
  <Popover content={<GenericUIRenderer item={{ ...data, componentIds }} label={testKey} />}>
    <Button>avg: {data.average.toFixed(2)}</Button>
  </Popover>
);

const getSimpleTestKeyRenderer = (testKey: MultiTestKeysType): ColumnType<Partial<ComponentType>> => ({
  title: testKey,
  dataIndex: ComponentKeyType.GeometryTypeId,
  render: (geometryTypeId) => {
    const data = getDataForTestKey(geometryTypeId, testKey);
    return data ? (
      SimpleDerivedTestDataRenderer(testKey, data[1], data[0])
    ) : (
      <MissingData reason={`missing: ${testKey}`} />
    );
  }
});

const getStressStrandTestRenderer = (
  testKey: (typeof SelectedPreStressStrandKeys)[number]
): ColumnType<Partial<ComponentType>> => ({
  title: testKey,
  dataIndex: ComponentKeyType.GeometryTypeId,
  render: (geometryTypeId) => {
    const data = useTableStore.getState().derivedTestData[geometryTypeId][ComponentTest.PreStressStrand];
    return data && data[testKey] ? (
      <GenericUIRenderer item={data} label={testKey} />
    ) : (
      <MissingData reason={`missing: ${testKey}`} />
    );
  }
});

const getMaterialAttributes = (materialKey: MaterialKeyType): ColumnType<Partial<ComponentType>> => ({
  title: materialKey,
  dataIndex: ComponentKeyType.GeometryTypeId,
  render: (geometryTypeId) => {
    const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
    if (!geometry) return <MissingData reason='geometry not found' />;
    const crossSection = getEntry<CrossSectionType>(
      CollectionName.CrossSections,
      geometry[GeometryKeyType.CrossSectionId]
    );
    if (!crossSection) return <MissingData reason='crossSection not found' />;
    const material = getEntry<MaterialType>(
      CollectionName.Materials,
      crossSection[CrossSectionKeyType.ConcreteMaterialTypeId]
    );
    if (!material) return <MissingData reason='material not found' />;
    return (material as any)[materialKey] ? (
      (material as any)[materialKey]
    ) : (
      <MissingData reason={`missing: ${materialKey}`} />
    );
  }
});

const getDerivedComponentColumns = (
  canChange: boolean
): Record<ComponentDerivedAttributes, ColumnType<Partial<ComponentType>>> => ({
  [ComponentDerivedAttributes.ComponentType]: {
    title: 'Component Type',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: (geometryTypeId) => getComponentCategory(geometryTypeId)
  },
  [ComponentDerivedAttributes.Width]: {
    title: 'Width',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: (geometryTypeId) => getWidthForGeometryType(geometryTypeId, canChange)
  },
  [ComponentDerivedAttributes.Length]: {
    title: 'Length',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: (geometryTypeId) => getLengthForGeometryType(geometryTypeId, canChange)
  },
  [ComponentDerivedAttributes.Height]: {
    title: 'Height',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: (geometryTypeId) => getHeightForGeometryType(geometryTypeId, canChange)
  },
  [ComponentDerivedAttributes.Volume]: {
    title: '.Volume',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: (geometryTypeId) => getVolumeForGeometryType(geometryTypeId)
  },
  [ComponentDerivedAttributes.Weight]: {
    title: '.Weight',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: (geometryTypeId) => getWeightForGeometryType(geometryTypeId)
  },
  [ComponentDerivedAttributes.Count]: {
    title: '.Count',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: (geometryTypeId) => getCountForGeometryType(geometryTypeId)
  },
  [ComponentDerivedAttributes.Rebar]: {
    title: '.Rebar',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: () => <MissingData reason='Rebar not yet implemented' />
  },
  [ComponentDerivedAttributes.MaterialPassport]: {
    title: '.Material Passport',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: () => <MissingData reason='Material Passport not yet implemented' />
  },
  [ComponentDerivedAttributes.LocationInRelationToBuilding]: {
    title: '.Location in Relation to Building',
    dataIndex: ComponentKeyType.Location,
    render: (e, c) => {
      const building = getEntry<BuildingType>(CollectionName.Buildings, c[ComponentKeyType.BuildingId]!);
      if (!building) return <MissingData reason='Building not found' />;
      const [x, y, z] = xyzToWebgl(getLocalCoordinates(building, e)).map((v) => v * 1e3) as [number, number, number];
      return (
        <span>
          ({x.toFixed(2)}, {y.toFixed(2)}, {z.toFixed(2)})
        </span>
      );
    }
  }
});

export const getColumnsForComponentKeys = (
  keys: (
    | ComponentDerivedAttributes
    | ComponentKeyType
    | MultiTestKeysType
    | MaterialKeyType
    | (typeof SelectedPreStressStrandKeys)[number]
  )[],
  canChange: boolean
) =>
  keys
    .map((k) =>
      Object.values(ComponentKeyType).includes(k as ComponentKeyType)
        ? simpleComponentColumns[k as ComponentKeyType]
        : Object.values(ComponentDerivedAttributes).includes(k as ComponentDerivedAttributes)
          ? getDerivedComponentColumns(canChange)[k as ComponentDerivedAttributes]
          : Object.values(MultiTestKeys).includes(k as MultiTestKeysType)
            ? getSimpleTestKeyRenderer(k as MultiTestKeysType)
            : Object.values(MaterialKeyType).includes(k as MaterialKeyType)
              ? getMaterialAttributes(k as MaterialKeyType)
              : Object.values(SelectedPreStressStrandKeys).includes(k as any)
                ? getStressStrandTestRenderer(k as any)
                : undefined
    )
    .filter((e) => e !== undefined) as ColumnType<ComponentType>[];
