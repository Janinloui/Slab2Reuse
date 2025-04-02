import { useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
import { SlabType } from '../../types/componentType';
import { getZForSlab, hasGeometryData } from '../../lib/3d';
import { SlabKeyType } from '../../enums/componentKeyType';
import { getColorForCondition } from '../../lib/colors';
import { useTableStore } from '../../state/tableStore';

export const Slab: React.FC<{ slab: Partial<SlabType>; positionOverride?: [number, number, number]; rotationOverride?: [number, number, number] }> = ({
  slab,
  positionOverride,
  rotationOverride,
}) => {
  const isValid = hasGeometryData(slab);

  const selectedIds = useTableStore((s) => s.selectedElementIds);

  const ref = useRef<Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [selected, setSelected] = useState(useTableStore.getState().selectedElementIds.includes(slab.id!));

  useEffect(() => {
    setSelected(selectedIds.includes(slab.id!));
  }, [selectedIds]);

  return isValid ? (
    <mesh
      key={slab.id}
      rotation={rotationOverride ?? [0, slab.rotZAxis_yaw ? (slab.rotZAxis_yaw * Math.PI) / 180 : 0, 0]}
      position={positionOverride ?? [slab[SlabKeyType.Location_x]!, -getZForSlab(slab), slab[SlabKeyType.Location_y]!]}
      ref={ref}
      onClick={() => {
        if (!selected) useTableStore.getState().setSelectedElementIds(slab.id!);
        else useTableStore.getState().clearSelection();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        hover(true);
      }}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[slab[SlabKeyType.Dimensions_l]!, slab[SlabKeyType.Dimensions_h]!, slab[SlabKeyType.Dimensions_w]!]} />
      <meshStandardMaterial color={selected ? '#9a9af9' : hovered ? 'hotpink' : slab.condition ? getColorForCondition(slab.condition) : 'orange'} />
    </mesh>
  ) : null;
};

export default Slab;

//rsponsible for rendering 3D slabs
