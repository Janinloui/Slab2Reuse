import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import Slab from './renderers/Slab';
import { Bounds, OrbitControls, useBounds } from '@react-three/drei';
import React, { Suspense, useEffect } from 'react';
import { getViewForSlab } from '../lib/3d';
import { Axis } from './utils/Axis';
import ArchitectSlabRenderer from './renderers/ArchitectSlabRender'; // Import the new component

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
  const userCategory = useTableStore((s) => s.userCategory); // Get the user category

  return (
    <Canvas>
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <directionalLight position={[10, 0, 0]} intensity={0.5} />
      <directionalLight position={[-10, 0, 0]} intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={Math.PI} />
      <directionalLight position={[-10, -10, -10]} intensity={1} />
      <Suspense fallback={null}>
        <group name='slabGroup'>
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom>
              {userCategory === 'Architect' ? (
                <ArchitectSlabRenderer /> // Render stacks for Architect view
              ) : (
                data.map((s, i) => <Slab key={`slab-${i}-${s.id}`} slab={s} />) // Default slab rendering
              )}
            </SelectToZoom>
          </Bounds>
        </group>
      </Suspense>
      <OrbitControls makeDefault />
      <Axis />
    </Canvas>
  );
};
