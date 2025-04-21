import { create } from 'zustand';
import { UserCategory } from '../enums/user';
import { DefaultRenderValues, RenderLocal } from '../table/attributeDefinition';
import { DerivedDataOfTestsForGeometryType } from '../types/dataOfTestsForGeometryType';

type TableStore = {
  userCategory: UserCategory;
  setUserCategory: (c: UserCategory) => void;
  userAttributeMap: Record<UserCategory, string[]>;
  setUserAttributeMap: (userCategory: UserCategory, attributes: string[]) => void;
  selectedElementIds: string[];
  setSelectedElementIds: (...ids: string[]) => void;
  clearSelection: () => void;
  derivedTestData: Record<string, Partial<DerivedDataOfTestsForGeometryType>>;
  setDerivedTestData: (data: Record<string, Partial<DerivedDataOfTestsForGeometryType>>) => void;
};

export const useTableStore = create<TableStore>((set, get) => ({
  userCategory: UserCategory.Slab2Reuse,
  setUserCategory: (userCategory: UserCategory) => set((s) => ({ userCategory })),
  userAttributeMap: DefaultRenderValues,
  setUserAttributeMap: (userCategory, attributes) =>
    set((s) => ({
      userAttributeMap: {
        ...s.userAttributeMap,
        [userCategory]: attributes.filter((s) => (RenderLocal as any)[s] !== undefined)
      }
    })),
  selectedElementIds: [],
  setSelectedElementIds: (...ids) => set(() => ({ selectedElementIds: ids })),
  clearSelection: () => set(() => ({ selectedElementIds: [] })),
  derivedTestData: {},
  setDerivedTestData: (derivedTestData) =>
    set((s) => ({
      derivedTestData
    }))
}));

//handles the process of adding, updating and deleting elements in the table
