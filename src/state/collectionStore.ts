import { create } from 'zustand';
import { DatabaseType } from '../types/databaseType';
import { DatabaseObjectType } from '../types/databaseObjectType';
import { CollectionName } from '../enums/collectionName';
import { useTableStore } from './tableStore';
import { getDataOfTestsForGeometryType } from '../lib/getDataOfTestsForGeometryType';

type CollectionStore = {
  collections: DatabaseType;
  _setCollections: (collections: DatabaseType) => void;
  updateEntry: (collectionName: CollectionName, entry: DatabaseObjectType) => void;
  deleteEntry: (collectionName: CollectionName, entryId: string) => void;
  addEntry: (collectionName: CollectionName, entry: DatabaseObjectType) => void;
};

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: {
    [CollectionName.Buildings]: [],
    [CollectionName.Users]: [],
    [CollectionName.Components]: [],
    [CollectionName.Geometries]: [],
    [CollectionName.CrossSections]: [],
    [CollectionName.Materials]: [],
    [CollectionName.Rebars]: []
  },
  _setCollections: (collections) => {
    set(() => ({ collections })),
      useTableStore.getState().setDerivedTestData(getDataOfTestsForGeometryType(collections)); // clear the derived test data when the collections change
  },
  updateEntry: (collectionName, entry) => {
    if (get().collections[collectionName].find((e) => e.id === entry.id) !== undefined)
      get()._setCollections({
        ...get().collections,
        [collectionName]: get().collections[collectionName].map((e) => (e.id === entry.id ? entry : e))
      });
    else get().addEntry(collectionName, entry);
  },
  deleteEntry: (collectionName, entryId) =>
    get()._setCollections({
      ...get().collections,
      [collectionName]: get().collections[collectionName].filter((e) => e.id !== entryId)
    }),
  addEntry: (collectionName, entry) =>
    get()._setCollections({
      ...get().collections,
      [collectionName]: [...get().collections[collectionName], entry]
    })
}));
