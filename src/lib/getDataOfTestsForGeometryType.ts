import { CollectionName } from '../enums/collectionName';
import { ComponentKeyType, ComponentTestKeys, ComponentTestKeyType } from '../enums/componentKeyType';
import { ComponentTest } from '../enums/componentTest';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { ComponentType } from '../types/componentType';
import { CrossSectionType } from '../types/crossSectionType';
import { GeometryType } from '../types/geometryType';
import {
  SelectedPreStressStrandKeys,
  DerivedDataOfTestsForGeometryType,
  DerivedTestData,
  SingularTestKeyMap
} from '../types/dataOfTestsForGeometryType';
import { getGeometryIdTypeComponentMap, getIdMap } from './getIdMapForTypes';
import { ReboundTestKeyType } from '../enums/reboundTestKeyType';
import { DatabaseType } from '../types/databaseType';

/**
 * Helper method that gets for every component the test data that is available
 * @returns
 */
export const getDataOfTestsForGeometryType = (
  collections: DatabaseType
): Record<string, Partial<DerivedDataOfTestsForGeometryType>> => {
  const geometryIdTypeComponentMap = getGeometryIdTypeComponentMap(collections[CollectionName.Components]);
  const crossSectionIdMap = getIdMap(collections[CollectionName.CrossSections]);
  const geometries = collections[CollectionName.Geometries];
  const geometriesIdMap = getIdMap(geometries);

  return Object.fromEntries(
    Object.entries(geometryIdTypeComponentMap).map(([geometryId, components]) => {
      const geometry = geometriesIdMap[geometryId];
      if (!geometry) return [geometryId, {}];
      return [
        geometryId,
        {
          [ComponentTest.PreStressStrand]: getDataForPreStressStrandTest(geometry, crossSectionIdMap),
          ...Object.fromEntries(
            Object.values(ComponentTestKeys).map((testKey) => [
              testKey,
              getMultiTestDataForSelectedKeys(components, testKey)
            ])
          )
        }
      ];
    })
  );
};

/**
 * Get the data for the pre stress strand type
 * @param geometry
 * @param crossSectionIdMap
 * @returns
 */
const getDataForPreStressStrandTest = (
  geometry: GeometryType,
  crossSectionIdMap: Record<string, CrossSectionType>
): DerivedDataOfTestsForGeometryType[ComponentTest.PreStressStrand] | undefined =>
  crossSectionIdMap[geometry[GeometryKeyType.CrossSectionId]][CrossSectionKeyType.PreStressStrandType]
    ? (Object.fromEntries(
        SelectedPreStressStrandKeys.map((k) => [
          k,
          crossSectionIdMap[geometry[GeometryKeyType.CrossSectionId]][CrossSectionKeyType.PreStressStrandType][k]
        ])
      ) as DerivedDataOfTestsForGeometryType[ComponentTest.PreStressStrand])
    : undefined;

/**
 * Get general multiTest data for selected keys for the tests that are stored on the component level
 * @param components - `ComponentType[]`
 * @param testKey - `ComponentTestKeyType`
 * @return - Record<T, MultiTestData>
 */
const getMultiTestDataForSelectedKeys = (components: ComponentType[], testKey: ComponentTestKeyType) => {
  // find all components that have values for the given testKey
  console.log(components);
  const relevantComponents = components.filter((c) => c[testKey]);

  console.log(relevantComponents);

  if (!relevantComponents.length) return undefined;
  switch (testKey) {
    case ComponentKeyType.DestructiveTest:
    case ComponentKeyType.CoreTest:
    case ComponentKeyType.ChemicalTest:
    case ComponentKeyType.GPRTest:
      return {
        ...Object.fromEntries(
          SingularTestKeyMap[testKey].map((key) => [
            key,
            getMultiDataFromResults(relevantComponents.map((c) => (c[testKey] as any)[key]) as number[])
          ])
        ),
        componentIds: relevantComponents.map((c) => c.id)
      };

    case ComponentKeyType.ReboundTest:
      return {
        [ReboundTestKeyType.ReboundValue]: getMultiDataFromResults(
          relevantComponents
            .map((c) => c[testKey]!.map((rt) => rt[ReboundTestKeyType.ReboundValue]))
            .flat(2) as number[],
          relevantComponents.length
        ),
        componentIds: relevantComponents.map((c) => c.id)
      };
  }
};

const getAverage = (values: number[]) => values.reduce((a, b) => b + a / values.length);
const getStandardDeviation = (values: number[]) => {
  const mean = getAverage(values);
  return Math.sqrt(getAverage(values.map((x) => (x - mean) ** 2)));
};
const getMedian = (values: number[]) => {
  if (values.length === 0) return NaN;
  values.sort((a, b) => a - b);
  if (values.length % 2 === 1) return values[Math.floor(values.length / 2)];
  return (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
};

const getMultiDataFromResults = (values: number[], totalComponentsTested?: number): DerivedTestData => ({
  average: getAverage(values),
  median: getMedian(values),
  stdv: getStandardDeviation(values),
  totalTests: values.length,
  totalComponentsTested: totalComponentsTested !== undefined ? totalComponentsTested : values.length
});
