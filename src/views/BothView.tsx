import { Splitter } from 'antd';
import { ThreeScene } from '../webgl/ThreeScene';
import { SlabTable } from '../table/SlabTable';

export const BothView: React.FC = () => (
  <Splitter layout='vertical' style={{ height: '100svh', width: '100%' }}>
    <Splitter.Panel>
      <ThreeScene />
    </Splitter.Panel>
    <Splitter.Panel>
      <SlabTable />
    </Splitter.Panel>
  </Splitter>
);
