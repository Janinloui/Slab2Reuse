import { useEffect } from 'react';
import { useTableStore } from '../state/tableStore';
import { exampleData } from '../state/exampleData';
import { Viewer } from '../Viewer';

export const ExampleData: React.FC = () => {
  useEffect(() => {
    useTableStore.setState((s) => ({ elements: exampleData }));
  }, []);

  return <Viewer />;
};
