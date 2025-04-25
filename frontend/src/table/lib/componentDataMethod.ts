import { CollectionName } from '../../enums/collectionName';
import { ComponentCategory } from '../../enums/componentCategory';
import { CrossSectionKeyType } from '../../enums/crossSectionKeyType';
import { GeometryKeyType } from '../../enums/geometryKeyType';
import { useCollectionStore } from '../../state/collectionStore';
import { CrossSectionType } from '../../types/crossSectionType';
import { DatabaseObjectType } from '../../types/databaseObjectType';
import { GeometryType } from '../../types/geometryType';

/**
 * Helper method to get a given entry from a collection of type T
 * @param collectionName - The CollectionName of the collection to get the entry from
 * @param id - The id of the entry to get
 * @returns object of type T or undefined
 */
export const getEntry = <T extends DatabaseObjectType>(collectionName: CollectionName, id: string) =>
  useCollectionStore.getState().collections[collectionName].find((g) => g.id === id) as T | undefined;

/**
 * Helper method to get the widht height and length of a given geometry
 * @param geometryTypeId - The id of the geometry
 * @returns `{ width: number; height: number; length: number }` | `null`
 */
export const getWidthHeightLenghtForGeometryId = (
  geometryTypeId: string
): { width: number; height: number; length: number } | null => {
  const geometry = getEntry<GeometryType>(CollectionName.Geometries, geometryTypeId);
  if (!geometry) return null;
  const crossSection = getEntry<CrossSectionType>(
    CollectionName.CrossSections,
    geometry[GeometryKeyType.CrossSectionId]
  );
  if (!crossSection) return null;
  return {
    width: crossSection[CrossSectionKeyType.Width],
    height:
      geometry[GeometryKeyType.ComponentCategory] === ComponentCategory.Slab
        ? crossSection[CrossSectionKeyType.Height]
        : geometry[GeometryKeyType.Height],
    length:
      geometry[GeometryKeyType.ComponentCategory] === ComponentCategory.Slab
        ? geometry[GeometryKeyType.Length]
        : crossSection[CrossSectionKeyType.Height]
  };
};
