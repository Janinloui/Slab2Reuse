import { Vector3 } from 'three';
import { SlabType, StabTypeGeometryAttributes } from '../types/slabType';

/**
 * Helper method to check whether a mesh can be rendered for the Partial<SlabType>
 * @param slab: Partial<SlabType>
 * @returns boolean
 */
export const hasGeometryData = (slab: Partial<SlabType>): boolean => StabTypeGeometryAttributes.every((a) => slab[a] !== undefined);

export const getCenterOfV3 = (vertices: Vector3[]): Vector3 =>
  vertices.reduce((a: Vector3, b: Vector3) => a.add(b), new Vector3()).multiplyScalar(1 / vertices.length);

export const getViewForSlab = (slab: Partial<SlabType>) =>
  hasGeometryData(slab)
    ? {
        target: [slab.location_x!, -slab.location_z!, slab.location_y!] as [number, number, number],
        position: [slab.location_x!, -slab.location_z! + 5000, slab.location_y!] as [number, number, number],
      }
    : undefined;
