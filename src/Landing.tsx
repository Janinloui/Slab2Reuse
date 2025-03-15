import { useNavigate } from 'react-router-dom';
import { UploadCSV } from './table/io/UploadCsv';
import { Slab2ReuseRoutes } from './enums/routes';
import { Button } from 'antd';
import { useTableStore } from './state/tableStore';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20, width: 'auto' }}>
      <UploadCSV initNew={true} />
      <UploadCSV />
      <Button onClick={() => navigate(Slab2ReuseRoutes.ExampleData)}>look at example data</Button>
      <Button
        onClick={() => {
          useTableStore.setState(() => ({ elements: [] }));
          navigate(Slab2ReuseRoutes.Viewer);
        }}
      >
        create new empty project
      </Button>
    </div>
  );
};
