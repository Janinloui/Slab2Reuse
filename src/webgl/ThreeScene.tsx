import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import Slab from './renderers/Slab';
import { Bounds, OrbitControls, useBounds } from '@react-three/drei';
import { Suspense, useEffect } from 'react';

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
const SelectToZoom: React.FC<{ children: any }> = ({ children }) => {
  const api = useBounds();
  const selectedIds = useTableStore((s) => s.selectedElementIds);

  useEffect(() => {
    if (selectedIds) {
      const slab = useTableStore.getState().elements.find((p) => selectedIds.includes(p.id!));
      if (slab)
        api.to({
          target: [slab.location_x!, -slab.location_z!, slab.location_y!],
          position: [slab.location_x! - 1000, -slab.location_z! - 1000, slab.location_y! - 1000],
        });
      else api.fit();
    } else api.fit();
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
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <SelectToZoom>
            {data.map((s, i) => (
              <Slab key={`slab-${i}-${s.id}`} slab={s} />
            ))}
          </SelectToZoom>
        </Bounds>
      </Suspense>
      <OrbitControls makeDefault />
    </Canvas>
  );
};

//responsible for rendering a 3D scene
