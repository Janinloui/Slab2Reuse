import { SlabKeyType } from '../enums/attributeNames';
import { DefaultDataMap, SlabType, SlabTypeValueMap } from '../types/slabType';

export type CsvData = Record<string, string>[];
/**
 * Internal helper type for mapping a CSV to a Partial<SlabType> Array
 */
type MappingTable = Partial<Record<string, SlabKeyType>>;

/**
 * Method than constructs the mapping table by trying to match the attribute names in the CSV to thouse defined in the SlabTypeKey enum
 * @param csvAttributes
 * @returns MappingTable
 */
const getFuzzilyMatchedAttributeTable = (csvAttributes: string[]): MappingTable => {
  const slabKeys = Object.values(SlabKeyType);

  const lowerCaseSlabKeys = slabKeys.map((s) => s.toLowerCase());
  return Object.fromEntries(
    csvAttributes
      .map((s) => {
        const index = lowerCaseSlabKeys.findIndex((slabKey) => slabKey === s.toLowerCase());
        return index !== -1 ? [s, slabKeys[index]] : undefined;
      })
      .filter((p) => p !== undefined)
  );
};

/**
 * Method that verifies whether it makes sense to use the CSV by checking whether defined SlabKeyType keys have been set or not
 * @param mappingTable - MappingTable
 * @param requiredKeys - SlabKeyType[]
 * @returns boolean
 */
const canMapAttributes = (mappingTable: MappingTable, requiredKeys: SlabKeyType[]): boolean => {
  const requiredKeysSet = new Set(requiredKeys);
  return requiredKeysSet.intersection(new Set(Object.values(mappingTable))).size === requiredKeysSet.size;
};

/**
 * Method that parses every entry depending on its type defined in the SlabTypeValueMap
 * @param attributeName - value to be checked whether it exists in mappingTable
 * @param value - value for the respective attribute
 * @param mappingTable - mapping table mapping attributes of the CSV to those of the SlabType
 * @returns correct value as defined in mappingTable
 */
const parsingEntry = (attributeName: string, value: string, mappingTable: MappingTable) => {
  if (!mappingTable[attributeName]) return undefined;
  switch (SlabTypeValueMap[mappingTable[attributeName]]) {
    case 'string':
    case 'enum':
      return value;
    case 'number':
      return Number(value);
    case 'numberArray':
      return JSON.parse(atob(value)) as unknown as number[];
    case 'nestedNumberArray':
      return JSON.parse(atob(value)) as unknown as number[][];
  }
};

/**
 * Method that tries to parse the CSV Entry (key, value) to a Partial<SlabType>: Record<SlabKeyType, number | string>
 * @param entry - Record<string, string>
 * @param mappingTable
 * @returns Record<SlabKeyType, number | string> matching Partial<SlabType>
 */
const mapEntry = (entry: Record<string, string>, mappingTable: MappingTable): Partial<SlabType> =>
  Object.fromEntries(
    Object.entries(entry)
      .map(([key, value]) => [mappingTable[key], parsingEntry(key, value, mappingTable)])
      .filter((s) => s !== undefined)
  );
const getMappedData = (csvData: CsvData, mappingTable: MappingTable): Partial<SlabType>[] => csvData.map((entry) => mapEntry(entry, mappingTable));

/**
 * Method that tries to parse the CSVData to a Partial<SlabType> Array
 * Will throw an error if some data is not set
 * @param csvData - Record<string, string>[];
 * @param requiredKeys - SlabKeyType[]
 * @returns Partial<SlabType>[]
 */
const getSlabTypesFromCsv = (csvData: CsvData, requiredKeys: SlabKeyType[] = [SlabKeyType.Id, SlabKeyType.PlanReference]): Partial<SlabType>[] => {
  const csvAttributes = new Set(csvData.map((entry) => Object.keys(entry)).flat());
  const mappingTable = getFuzzilyMatchedAttributeTable([...csvAttributes]);

  if (!canMapAttributes(mappingTable, requiredKeys)) throw new Error("can't map enough attributes");
  return getMappedData(csvData, mappingTable);
};

/**
 * Wrapper method that adds an id to a Partial<SlabType> Array (init from CSV)
 * @param data - Partial<SlabType>[]
 * @returns Partial<SlabType>[] with an id set
 */
const addNewIds = (data: Partial<SlabType>[]): Partial<SlabType>[] => data.map((entry, i) => ({ ...entry, [SlabKeyType.Id]: i.toString() }));
const hasAttribute = (data: Partial<SlabType>[], attribute: SlabKeyType): boolean => data.every((e) => e[attribute] !== undefined);

/**
 * Data that can be added with boilerplate if the rest isn't available
 * @param data - Partial<SlabType>[]
 * @returns Partial<SlabType>[]
 */
const addDefaultData = (data: Partial<SlabType>[]): Partial<SlabType>[] =>
  data.map((slab) => {
    const missingKeysForWhichDefaultIsDefined = new Set(Object.keys(DefaultDataMap)).difference(new Set(Object.keys(slab))) as Set<SlabKeyType>;
    if (missingKeysForWhichDefaultIsDefined.size)
      return { ...slab, ...Object.fromEntries([...missingKeysForWhichDefaultIsDefined].map((k) => [k, DefaultDataMap[k]])) };
    return slab;
  });

/**
 * Don't use with existing projects
 * Method that returns a Partial<SlabType> Array from csv data, populate with NEW IDS
 * @param csvData - CsvData
 * @returns Partial<SlabType>[] with an id set
 */
export const initNewProject = (csvData: CsvData): Partial<SlabType>[] => {
  const slabData = getSlabTypesFromCsv(csvData, [SlabKeyType.PlanReference]);
  return addDefaultData(hasAttribute(slabData, SlabKeyType.Id) ? slabData : addNewIds(slabData));
};

/**
 * Method that returns a Partial<SlabType> Array from csv data
 * @param csvData - CsvData
 * @returns Partial<SlabType>[]
 */
export const loadProject = (csvData: CsvData): Partial<SlabType>[] => {
  const slabData = getSlabTypesFromCsv(csvData, [SlabKeyType.PlanReference, SlabKeyType.Id]);
  return addDefaultData(slabData);
};

/**
 * helper method to prepare element data for storing in the csv
 * @param attribute - SlabKeyType
 * @param value - string | number | number[] | number[][]
 */
const getCSVValueForData = (attribute: SlabKeyType, value: any): string => {
  switch (SlabTypeValueMap[attribute]) {
    case 'string':
    case 'enum':
      return value as string;
    case 'number':
      return (Math.round(value * 1e3) * 1e-3).toFixed(3);
    case 'numberArray':
    case 'nestedNumberArray':
      return btoa(JSON.stringify(value));
  }
};

/**
 * Method to construct csv data based on the elements
 * @returns Record<string, string>
 */
const getCSVObjectFromSlabType = (element: Partial<SlabType>): Record<string, string> =>
  Object.fromEntries(Object.entries(element).map(([key, value]) => [key, getCSVValueForData(key as SlabKeyType, value)]));

export const getCSVDataFromSlabTypes = (elements: Partial<SlabType>[]): Record<string, string>[] => elements.map(getCSVObjectFromSlabType);
