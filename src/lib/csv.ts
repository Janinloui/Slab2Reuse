import { SlabKeyType } from '../enums/attributeNames';
import { SlabType, SlabTypeValueMap } from '../types/slabType';

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
 * Method that tries to parse the CSV Entry (key, value) to a Partial<SlabType>: Record<SlabKeyType, number | string>
 * @param entry - Record<string, string>
 * @param mappingTable
 * @returns Record<SlabKeyType, number | string> matching Partial<SlabType>
 */
const mapEntry = (entry: Record<string, string>, mappingTable: MappingTable): Partial<SlabType> =>
  Object.fromEntries(
    Object.entries(entry)
      .map(([key, value]) => (mappingTable[key] ? [mappingTable[key], SlabTypeValueMap[mappingTable[key]] === 'number' ? Number(value) : value] : undefined))
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
 * Don't use with existing projects
 * Method that returns a Partial<SlabType> Array from csv data, populate with NEW IDS
 * @param csvData - CsvData
 * @returns Partial<SlabType>[] with an id set
 */
export const initNewProject = (csvData: CsvData): Partial<SlabType>[] => {
  const slabData = getSlabTypesFromCsv(csvData, [SlabKeyType.PlanReference]);
  return hasAttribute(slabData, SlabKeyType.Id) ? slabData : addNewIds(slabData);
};

/**
 * Method that returns a Partial<SlabType> Array from csv data
 * @param csvData - CsvData
 * @returns Partial<SlabType>[]
 */
export const loadProject = (csvData: CsvData): Partial<SlabType>[] => {
  const slabData = getSlabTypesFromCsv(csvData, [SlabKeyType.PlanReference, SlabKeyType.Id]);
  return hasAttribute(slabData, SlabKeyType.Id) ? slabData : addNewIds(slabData);
};
