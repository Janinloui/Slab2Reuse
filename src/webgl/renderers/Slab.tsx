import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { SlabType } from '../../types/slabType';
import { hasGeometryData } from '../../lib/3d';
import { SlabKeyType } from '../../enums/attributeNames';
import { getColorForCondition } from '../../lib/colors';

export const Slab: React.FC<{ slab: Partial<SlabType> }> = ({ slab }) => {
  const isValid = hasGeometryData(slab);

  const ref = useRef<Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  return isValid ? (
    <mesh
      key={slab.id}
      rotation={[0, slab.rotZAxis_yaw ? (slab.rotZAxis_yaw * Math.PI) / 180 : 0, 0]}
      position={[slab[SlabKeyType.Location_x]!, -slab[SlabKeyType.Level]!*-3000, slab[SlabKeyType.Location_y]!]}
      ref={ref}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[slab.dimensions_l, slab.dimensions_h, slab.dimensions_w]} />
      <meshStandardMaterial color={clicked ? 'red' : hovered ? 'hotpink' : slab.condition ? getColorForCondition(slab.condition) : 'orange'} />
    </mesh>
  ) : null;
};

export default Slab;

//rsponsible for rendering 3D slabs
