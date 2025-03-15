import { SlabType, StabTypeGeometryAttributes } from '../types/slabType';

export const hasGeometryData = (slab: Partial<SlabType>): boolean => StabTypeGeometryAttributes.every((a) => slab[a] !== undefined);
