import { Vector3 } from 'three';
import { SlabType, SlabTypeGeometryAttributes } from '../types/componentType';

export const FLOOR_TO_FLOOR = 3000;

export const getZForSlab = (slab: Partial<SlabType>) => (slab.floor ?? 0) * FLOOR_TO_FLOOR;

/**
 * Helper method to check whether a mesh can be rendered for the Partial<SlabType>
 * @param slab: Partial<SlabType>
 * @returns boolean
 */
export const hasGeometryData = (slab: Partial<SlabType>): boolean => SlabTypeGeometryAttributes.every((a) => slab[a] !== undefined);

export const getCenterOfV3 = (vertices: Vector3[]): Vector3 =>
  vertices.reduce((a: Vector3, b: Vector3) => a.add(b), new Vector3()).multiplyScalar(1 / vertices.length);

export const getViewForSlab = (slab: Partial<SlabType>) =>
  hasGeometryData(slab)
    ? {
        // Correct mapping of slab data to Three.js coordinates
        target: [slab.location_x!, getZForSlab(slab), slab.location_y!] as [number, number, number],
        position: [slab.location_x!, getZForSlab(slab) + 5000, slab.location_y!] as [number, number, number],
      }
    : undefined;

    