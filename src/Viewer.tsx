import { ComponentTable } from './element/ComponentTable';
import { ThreeScene } from './webgl/ThreeScene';

export const Viewer: React.FC = () => {
  return (
    <>
      <div style={{ height: '50vh' }}>
        <ThreeScene key='scene' />
      </div>
      <ComponentTable />
    </>
  );
};
