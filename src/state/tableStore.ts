import { create } from 'zustand';
import { SlabType } from '../types/slabType';
import { UserCategory } from '../enums/user';
import { DefaultRenderValues } from '../table/attributeDefinition';
import { SlabKeyType } from '../enums/attributeNames';

type TableStore = {
  elements: Partial<SlabType>[];
  updateElement: (element: SlabType) => void;
  userCategory: UserCategory;
  setUserCategory: (c: UserCategory) => void;
  userAttributeMap: Record<UserCategory, string[]>;
  setUserAttributeMap: (userCategory: UserCategory, attributes: string[]) => void;
  addElement: (element: Partial<SlabType>) => void;
};

export const useTableStore = create<TableStore>((set, get) => ({
  elements: [],
  updateElement: (element: SlabType) =>
    set((s) => {
      const index = s.elements.findIndex((e) => e.id === element.id);
      if (index !== -1) s.elements[index] = { ...element };
      return { elements: [...s.elements] };
    }),
  userCategory: UserCategory.Slab2Reuse,
  setUserCategory: (userCategory: UserCategory) => set((s) => ({ userCategory })),
  userAttributeMap: DefaultRenderValues,
  setUserAttributeMap: (userCategory, attributes) => set((s) => ({ userAttributeMap: { ...s.userAttributeMap, [userCategory]: attributes } })),
  addElement: (element) => {
    if (!element[SlabKeyType.Id]) element[SlabKeyType.Id] = new Date().getMilliseconds().toString();
    set((s) => ({ elements: [...s.elements, element] }));
  },
}));

//handles the process of adding, updating and deleting elements in the table