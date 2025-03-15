import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import Slab from './renderers/Slab';
export const ThreeScene: React.FC = () => {
  const data = useTableStore((s) => s.elements);
  return (
    <Canvas style={{ height: '800px' }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            {data.map((s) => (
              <Slab slab={s} />
            ))}
    </Canvas>
  );
};
