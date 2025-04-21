import { create } from 'zustand';
import {
  DerivedDataOfTestsForGeometryType,
  MultiTestKeysType,
  SelectedPreStressStrandKeys
} from '../types/dataOfTestsForGeometryType';
import { DefaultViewerColumnMap, NamedViews } from '../enums/viewer';
import { ComponentDerivedAttributes } from '../enums/componentDerivedAttributes';
import { ComponentKeyType } from '../enums/componentKeyType';

type TableStore = {
  viewer: NamedViews;
  setViewer: (v: NamedViews) => void;
  viewerAttributeMap: Record<
    NamedViews,
    (ComponentDerivedAttributes | ComponentKeyType | MultiTestKeysType | (typeof SelectedPreStressStrandKeys)[number])[]
  >;
  setViewerAttributeMap: (viewer: NamedViews, attributes: string[]) => void;
  selectedElementIds: string[];
  setSelectedElementIds: (...ids: string[]) => void;
  clearSelection: () => void;
  derivedTestData: Record<string, Partial<DerivedDataOfTestsForGeometryType>>;
  setDerivedTestData: (data: Record<string, Partial<DerivedDataOfTestsForGeometryType>>) => void;
};

export const useTableStore = create<TableStore>((set, get) => ({
  viewer: NamedViews.ArchiveReusePotential,
  setViewer: (viewer) => set(() => ({ viewer })),
  viewerAttributeMap: DefaultViewerColumnMap,
  setViewerAttributeMap: (viewer, attributes) =>
    set((s) => ({
      viewerAttributeMap: {
        ...s.viewerAttributeMap,
        [viewer]: attributes
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
