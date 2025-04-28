import { ComponentKeyType } from '../enums/componentKeyType';
import { ComponentType } from '../types/componentType';
import { DatabaseObjectType } from '../types/databaseObjectType';

/**
 * Helper method to get an idMap for a Type T
 * @param objects - Type `Array<T>`
 * @returns `Record<T.id, T>`
 */
export const getIdMap = <T extends DatabaseObjectType>(objects: T[]) =>
  Object.fromEntries(objects.map((t) => [t.id, t]));

/**
 * Helper method to get Components mapped by geometryId
 * @param components - ComponentType[]
 * @returns Record<string, ComponentType[]>
 */
export const getGeometryIdTypeComponentMap = (components: ComponentType[]): Record<string, ComponentType[]> => {
  const geometryIdTypeComponentMap: Record<string, ComponentType[]> = {};
  for (const component of components)
    geometryIdTypeComponentMap[component[ComponentKeyType.GeometryTypeId]]
      ? geometryIdTypeComponentMap[component[ComponentKeyType.GeometryTypeId]].push(component)
      : (geometryIdTypeComponentMap[component[ComponentKeyType.GeometryTypeId]] = [component]);
  return geometryIdTypeComponentMap;
};
