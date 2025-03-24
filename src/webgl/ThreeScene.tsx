import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import Slab from './renderers/Slab';
import { Bounds, OrbitControls, useBounds, Text } from '@react-three/drei';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { getViewForSlab, getZForSlab } from '../lib/3d';
import { AxesHelper } from 'three'; 


// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
const SelectToZoom: React.FC<{ children: any }> = ({ children }) => {
  const api = useBounds();
  const selectedIds = useTableStore((s) => s.selectedElementIds);

  useEffect(() => {
    if (selectedIds) {
      const slab = useTableStore.getState().elements.find((p) => selectedIds.includes(p.id!));
      if (slab) {
        const view = getViewForSlab(slab);
        view ? api.to(view) : api.fit();
      } else api.fit();
    }
  }, [selectedIds]);

  return (
    <group
      onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())}
      onPointerMissed={(e: any) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
};

export const ThreeScene: React.FC = () => {
  const data = useTableStore((s) => s.elements);
  const axesRef = useRef<AxesHelper>(null);
  const [axesSize, setAxesSize] = useState(500); 
  const [axesPosition, setAxesPosition] = useState<[number, number, number]>([0, 0, 0]);
  useEffect(() => {
    if (data.length > 0) {
      // Calculate the bounding box of the slabs
      const minX = Math.min(...data.map((slab) => slab.location_x ?? 0));
      const maxX = Math.max(...data.map((slab) => slab.location_x ?? 0));
      const minY = Math.min(...data.map((slab) => getZForSlab(slab)));
      const maxY = Math.max(...data.map((slab) => getZForSlab(slab)));
      const minZ = Math.min(...data.map((slab) => slab.location_y ?? 0));
      const maxZ = Math.max(...data.map((slab) => slab.location_y ?? 0));

      // Calculate the maximum extent of the scene
      const maxExtent = Math.max(
        Math.abs(maxX - minX),
        Math.abs(maxY - minY),
        Math.abs(maxZ - minZ)
      );

      // Set the axes size to be proportional to the maximum extent
      setAxesSize(maxExtent * 0.1); // Scale factor for better visibility

      // Offset the axes slightly outside the bounding box
      setAxesPosition([minX - maxExtent * 0.05, minY, minZ - maxExtent * 0.05]); // Offset in X and Z in three.js coordinates
    }
  }, [data]);

  return (
    
        <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense fallback={null}>
          <Bounds fit clip margin={1.2}>
            <SelectToZoom>
              {data.map((s, i) => (
                <Slab key={`slab-${i}-${s.id}`} slab={s} />
              ))}
            </SelectToZoom>
          </Bounds>
        </Suspense>
        <OrbitControls makeDefault />
          <group position={axesPosition}>
            <axesHelper ref={axesRef} args={[axesSize]} />
            <Text position={[axesSize, 0, 0]} fontSize={axesSize / 20} color="red">
              X
            </Text>
            <Text position={[0, axesSize, 0]} fontSize={axesSize / 20} color="green">
              Z
            </Text>
            <Text position={[0, 0, axesSize]} fontSize={axesSize / 20} color="blue">
              Y
            </Text>
          </group>
      </Canvas>
  );
};


