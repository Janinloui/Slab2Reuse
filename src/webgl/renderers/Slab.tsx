import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { SlabType } from '../../types/slabType';

export const Slab: React.FC<{ slab: SlabType }> = ({ slab }) => {
  const ref = useRef<Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  return (
    <mesh
      key={slab.id}
      position={[slab.location_x, -slab.location_y, slab.location_z]}
      ref={ref}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[slab.dimensions_w, slab.dimensions_h, slab.dimensions_l]} />
      <meshStandardMaterial color={clicked ? 'red' : hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Slab;
