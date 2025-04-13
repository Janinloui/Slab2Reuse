import { ColumnType } from 'antd/es/table';
import { EntryRenderer } from '../../generic/GenericUIRenderer';
import { AllKeyEntriesMap } from '../../types/allKeyMap';

/**
 * Helper method to get the column type for a given key of a an object of type U.
 * @param k - k of the object of type U
 * @returns ColumnType<Partial<U>>
 */
const getColumnTypeForKey = <U extends Record<string, any>>(k: keyof U): ColumnType<Partial<U>> => ({
  title: k as string,
  dataIndex: k as string,
  render: (_, r) =>
    r[k] !== undefined ? <EntryRenderer k={k as string} valueType={AllKeyEntriesMap[k]} value={r[k]} /> : null
});

/**
 * Helper method to get the column type record for all the given key of a an object of type U.
 * @param keys - keys of the object of type U
 * @returns Record<keyof U, ColumnType<Partial<U>>>
 */
export const getColumTypeForEnums = <U extends Record<string, any>>(keys: (keyof U)[]) =>
  Object.fromEntries(keys.map((k) => [k, getColumnTypeForKey<U>(k)])) as Record<keyof U, ColumnType<Partial<U>>>;
