import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { SlabType } from '../../types/slabType';
import { hasGeometryData } from '../../lib/3d';
import { SlabKeyType } from '../../enums/attributeNames';

export const Slab: React.FC<{ slab: Partial<SlabType> }> = ({ slab }) => {
  const isValid = hasGeometryData(slab);

  const ref = useRef<Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  return isValid ? (
    <mesh
      key={slab.id}
      position={[slab[SlabKeyType.Location_x]!, -slab[SlabKeyType.Location_y]!, slab[SlabKeyType.Location_z]!]}
      ref={ref}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[slab.dimensions_w, slab.dimensions_h, slab.dimensions_l]} />
      <meshStandardMaterial color={clicked ? 'red' : hovered ? 'hotpink' : 'orange'} />
    </mesh>
  ) : null;
};

export default Slab;

//rsponsible for rendering 3D slabs