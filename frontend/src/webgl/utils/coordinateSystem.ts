/**
 * Helper methord to transform xyz coordinates to webgl coordinates
 * @param v - Vector3Type
 * @returns [number, number, number]
 */
export const xyzToWebgl = (v: { x: number; y: number; z: number }): [number, number, number] => [v.x, -v.z, v.y];
