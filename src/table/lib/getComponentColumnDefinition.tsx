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
import { EntryRenderer } from '../../generic/GenericUIRenderer';
import { GeometryType } from '../../types/geometryType';
import { CrossSectionKeyType } from '../../enums/crossSectionKeyType';
import { CrossSectionType } from '../../types/crossSectionType';
import { getEntry } from './componentDataMethod';

const WEIGHT_MULTIPLIER = 2.6;

const simpleComponentColumns = getColumTypeForEnums<ComponentType>(Object.values(ComponentKeyType));

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
      .collections[CollectionName.Components].reduce(
        (count, component) => (component[ComponentKeyType.GeometryTypeId] === geometryTypeId ? count + 1 : count),
        0
      )}
  />
);

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
  [ComponentDerivedAttributes.ReboundTestMean]: {
    title: '.ReboundTestMean',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: () => <MissingData reason='ReboundTestMean not yet implemented' />
  },
  [ComponentDerivedAttributes.ReboundTestStdv]: {
    title: '.ReboundTestStdv',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: () => <MissingData reason='ReboundTestStdv not yet implemented' />
  },
  [ComponentDerivedAttributes.DestructiveTest]: {
    title: '.DestructiveTest',
    dataIndex: ComponentKeyType.GeometryTypeId,
    render: () => <MissingData reason='DestructiveTest not yet implemented' />
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
  }
});

export const getColumnsForComponentKeys = (
  keys: (ComponentDerivedAttributes | ComponentKeyType)[],
  canChange: boolean
) =>
  keys
    .map((k) =>
      Object.values(ComponentKeyType).includes(k as ComponentKeyType)
        ? simpleComponentColumns[k as ComponentKeyType]
        : Object.values(ComponentDerivedAttributes).includes(k as ComponentDerivedAttributes)
        ? getDerivedComponentColumns(canChange)[k as ComponentDerivedAttributes]
        : undefined
    )
    .filter((e) => e !== undefined) as ColumnType<ComponentType>[];
