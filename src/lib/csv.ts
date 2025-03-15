import { SlabKeyType } from '../enums/attributeNames';
import { SlabType, SlabTypeValueMap } from '../types/slabType';

export type CsvData = Record<string, string>[];
type MappingTable = Partial<Record<string, SlabKeyType>>;

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

const canMapAttributes = (mappingTable: Partial<Record<string, SlabKeyType>>, requiredKeys: SlabKeyType[]): boolean => {
  const requiredKeysSet = new Set(requiredKeys);
  return requiredKeysSet.intersection(new Set(Object.values(mappingTable))).size === requiredKeysSet.size;
};

const mapEntry = (entry: Record<string, string>, mappingTable: MappingTable): Partial<SlabType> =>
  Object.fromEntries(
    Object.entries(entry)
      .map(([key, value]) => (mappingTable[key] ? [mappingTable[key], SlabTypeValueMap[mappingTable[key]] === 'number' ? Number(value) : value] : undefined))
      .filter((s) => s !== undefined)
  );
const getMappedData = (csvData: CsvData, mappingTable: MappingTable): Partial<SlabType>[] => csvData.map((entry) => mapEntry(entry, mappingTable));

const getSlabTypeFromCsv = (csvData: CsvData, requiredKeys: SlabKeyType[] = [SlabKeyType.Id, SlabKeyType.PlanReference]): Partial<SlabType>[] => {
  const csvAttributes = new Set(csvData.map((entry) => Object.keys(entry)).flat());
  const mappingTable = getFuzzilyMatchedAttributeTable([...csvAttributes]);

  if (!canMapAttributes(mappingTable, requiredKeys)) throw new Error("can't map enough attributes");
  return getMappedData(csvData, mappingTable);
};

const addNewIds = (data: Partial<SlabType>[]): Partial<SlabType>[] => data.map((entry, i) => ({ ...entry, [SlabKeyType.Id]: i.toString() }));
const hasAttribute = (data: Partial<SlabType>[], attribute: SlabKeyType): boolean => data.every((e) => e[attribute] !== undefined);

export const initNewProject = (csvData: CsvData): Partial<SlabType>[] => {
  const slabData = getSlabTypeFromCsv(csvData, [SlabKeyType.PlanReference]);
  return hasAttribute(slabData, SlabKeyType.Id) ? slabData : addNewIds(slabData);
};
