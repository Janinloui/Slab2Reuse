import { create } from 'zustand';
import { DatabaseType } from '../types/databaseType';
import { exampleData } from './exampleData';
import { getMappedData } from '../lib/parsingOldData';

type CollectionStore = {
  collections: DatabaseType;
};

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: getMappedData(exampleData)
}));
