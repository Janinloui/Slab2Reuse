import { create } from 'zustand';
import { DatabaseType } from '../types/databaseType';
import { exampleData } from './exampleData';
import { getMappedData } from '../lib/parsingOldData';
import { DatabaseObjectType } from '../types/databaseObjectType';
import { CollectionName } from '../enums/collectionName';

type CollectionStore = {
  collections: DatabaseType;
  updateEntry: (collectionName: CollectionName, entry: DatabaseObjectType) => void;
  deleteEntry: (collectionName: CollectionName, entryId: string) => void;
  addEntry: (collectionName: CollectionName, entry: DatabaseObjectType) => void;
};

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: getMappedData(exampleData),
  updateEntry: (collectionName, entry) => {
    if (get().collections[collectionName].find((e) => e.id === entry.id) !== undefined)
      set((s) => ({
        collections: {
          ...s.collections,
          [collectionName]: s.collections[collectionName].map((e) => (e.id === entry.id ? entry : e))
        }
      }));
    else get().addEntry(collectionName, entry);
  },
  deleteEntry: (collectionName, entryId) =>
    set((s) => ({
      collections: {
        ...s.collections,
        [collectionName]: s.collections[collectionName].filter((e) => e.id !== entryId)
      }
    })),
  addEntry: (collectionName, entry) =>
    set((s) => ({
      collections: {
        ...s.collections,
        [collectionName]: [...s.collections[collectionName], entry]
      }
    }))
}));
