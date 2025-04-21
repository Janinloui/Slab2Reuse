import { Splitter } from 'antd';
import { ThreeScene } from '../webgl/ThreeScene';
import { ComponentTypeTable } from '../table/ComponentTypeTable';

export const BothView: React.FC = () => (
  <Splitter layout='vertical' style={{ height: '100svh', width: '100%' }}>
    <Splitter.Panel>
      <ThreeScene />
    </Splitter.Panel>
    <Splitter.Panel>
      <ComponentTypeTable />
    </Splitter.Panel>
  </Splitter>
);
