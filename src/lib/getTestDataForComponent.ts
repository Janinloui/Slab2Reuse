import { CollectionName } from '../enums/collectionName';
import { ComponentTest } from '../enums/componentTest';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { useCollectionStore } from '../state/collectionStore';
import { CrossSectionType } from '../types/crossSectionType';
import { GeometryType } from '../types/geometryType';
import { SelectedPreStressStrandKeys, TestDataForGeometryType } from '../types/testDataForGeometryType';
import { getGeometryIdTypeComponentMap, getIdMap } from './getIdMapForTypes';

/**
 * Helper method that gets for every component the test data that is available
 * @returns
 */
export const getTestDataForComponets = (): Record<string, Partial<TestDataForGeometryType>> => {
  const data = useCollectionStore.getState().collections;
  const geometryIdTypeComponentMap = getGeometryIdTypeComponentMap(data[CollectionName.Components]);
  const crossSectionIdMap = getIdMap(data[CollectionName.CrossSections]);
  const geometries = data[CollectionName.Geometries];
};

const getDataForPreStressStrandTest = (
  geometry: GeometryType,
  crossSectionIdMap: Record<string, CrossSectionType>
): TestDataForGeometryType[ComponentTest.PreStressStrand] | undefined =>
  crossSectionIdMap[geometry[GeometryKeyType.CrossSectionId]][CrossSectionKeyType.PreStressStrandType]
    ? (Object.fromEntries(
        SelectedPreStressStrandKeys.map((k) => [
          k,
          crossSectionIdMap[geometry[GeometryKeyType.CrossSectionId]][CrossSectionKeyType.PreStressStrandType][k]
        ])
      ) as TestDataForGeometryType[ComponentTest.PreStressStrand])
    : undefined;
