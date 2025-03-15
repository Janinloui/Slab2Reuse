import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import Slab from './renderers/Slab';
import { Bounds, OrbitControls, useBounds } from '@react-three/drei';
import { Suspense } from 'react';

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
const SelectToZoom: React.FC<{ children: any }> = ({ children }) => {
  const api = useBounds();
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
    <Canvas style={{ height: '800px' }}>
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
