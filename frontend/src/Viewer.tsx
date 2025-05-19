import { ComponentTypeTable } from './table/ComponentTypeTable';
import { ThreeScene } from './webgl/ThreeScene';
import { GraphView } from './graph/graphView';

export const Viewer: React.FC = () => (
  <>
    <div style={{ display: 'flex', height: '50vh' }}>
      <div style={{ flex: 1 }}>
        <ThreeScene key='scene' />
      </div>
      <div style={{ flex: 1 }}>
        <GraphView />
      </div>
    </div>
    <ComponentTypeTable height={window.innerHeight * 0.5} />
  </>
);