import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import Slab from './renderers/Slab';
import { Bounds, OrbitControls, useBounds } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { getViewForSlab } from '../lib/3d';
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
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <SelectToZoom>
            {userCategory === 'Architect' ? (
              <ArchitectSlabRenderer /> // Render stacks for Architect view
            ) : (
              data.map((s, i) => <Slab key={`slab-${i}-${s.id}`} slab={s} />) // Default slab rendering
            )}
          </SelectToZoom>
        </Bounds>
      </Suspense>
      <OrbitControls makeDefault />
    </Canvas>
  );
};

//responsible for rendering a 3D scene
