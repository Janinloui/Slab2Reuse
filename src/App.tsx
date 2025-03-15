import { CsvUpload } from './table/io/CsvUpload';
import { SlabTable } from './table/SlabTable';
import { ThreeScene } from './webgl/ThreeScene';

export const App: React.FC = () => {
  return (
    <>
      <ThreeScene key='scene' />
      <SlabTable key='slabTable' />
      <CsvUpload key='csvUpload' />
    </>
  );
};
