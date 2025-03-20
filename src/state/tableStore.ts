import { create } from 'zustand';
import { SlabType } from '../types/slabType';
import { UserCategory } from '../enums/user';
import { DefaultRenderValues, RenderLocal } from '../table/attributeDefinition';
import { SlabKeyType } from '../enums/attributeNames';

type TableStore = {
  elements: Partial<SlabType>[];
  updateElement: (id: string, element: Partial<SlabType>) => void;
  userCategory: UserCategory;
  setUserCategory: (c: UserCategory) => void;
  userAttributeMap: Record<UserCategory, string[]>;
  setUserAttributeMap: (userCategory: UserCategory, attributes: string[]) => void;
  addElement: (element: Partial<SlabType>) => void;
  selectedElementIds: string[];
  setSelectedElementIds: (...ids: string[]) => void;
  clearSelection: () => void;
};

export const useTableStore = create<TableStore>((set, get) => ({
  elements: [],
  updateElement: (id: string, element: Partial<SlabType>) =>
    set((s) => {
      const index = s.elements.findIndex((e) => e.id === id);
      if (index !== -1) {
        const updatedElements = [...s.elements]; // Create a new array reference
        updatedElements[index] = { ...s.elements[index], ...element }; // Update the specific element
        console.log('Updated Elements:', updatedElements); // Debugging log
        return { elements: updatedElements }; // Return the new array
      }
      return { elements: s.elements }; // No changes if the element is not found
    }),
  userCategory: UserCategory.Slab2Reuse,
  setUserCategory: (userCategory: UserCategory) => set((s) => ({ userCategory })),
  userAttributeMap: DefaultRenderValues,
  setUserAttributeMap: (userCategory, attributes) =>
    set((s) => ({ userAttributeMap: { ...s.userAttributeMap, [userCategory]: attributes.filter((s) => RenderLocal[s as SlabKeyType] !== undefined) } })),
  addElement: (element) => {
    if (!element[SlabKeyType.Id]) element[SlabKeyType.Id] = new Date().getMilliseconds().toString();
    set((s) => ({ elements: [...s.elements, element] }));
  },
  selectedElementIds: [],
  setSelectedElementIds: (...ids) => set(() => ({ selectedElementIds: ids })),
  clearSelection: () => set(() => ({ selectedElementIds: [] })),
}));

//handles the process of adding, updating and deleting elements in the table
