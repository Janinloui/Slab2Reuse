import { useNavigate } from 'react-router-dom';
import { UploadCSV } from './table/io/UploadCsv';
import { Slab2ReuseRoutes } from './enums/routes';
import { Button } from 'antd';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <UploadCSV initNew={true} />
      <UploadCSV />
      <Button onClick={() => navigate(Slab2ReuseRoutes.ExampleData)}>look at example data</Button>
    </div>
  );
};
