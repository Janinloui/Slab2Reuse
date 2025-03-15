import { SlabTable } from './table/SlabTable';
import { ThreeScene } from './webgl/ThreeScene';

export const App: React.FC = () => {
  return (
    <>
      <ThreeScene />
      <SlabTable />
    </>
  );
};
