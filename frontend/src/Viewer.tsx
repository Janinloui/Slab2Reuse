import { ComponentTypeTable } from './table/ComponentTypeTable';
import { ThreeScene } from './webgl/ThreeScene';

export const Viewer: React.FC = () => {
  return (
    <>
      <div style={{ height: '50vh' }}>
        <ThreeScene key='scene' />
      </div>
      <ComponentTypeTable height={window.innerHeight * 0.5} />
    </>
  );
};
