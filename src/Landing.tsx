import { useNavigate } from 'react-router-dom';
import { UploadCSV } from './table/io/UploadCsv';
import { Slab2ReuseRoutes } from './enums/routes';
import { Button } from 'antd';
import { useTableStore } from './state/tableStore';
import { FaUpload } from 'react-icons/fa6';
import { CSSProperties } from 'react';

const buttonStyles: CSSProperties = {
  justifyContent: 'left',
  width: 450,
  padding: 30,
  fontSize: 20,
};

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span style={{ fontSize: 25, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', paddingLeft: 30 }}>
        Welcome to <p style={{ fontWeight: 'bold' }}>Slab2Reuse</p> 💫
      </span>
      <UploadCSV initNew={true}>
        <Button style={buttonStyles} type='text' icon={<FaUpload />}>
          start a new project from a .csv
        </Button>
      </UploadCSV>
      <UploadCSV>
        <Button style={buttonStyles} type='text' icon={<FaUpload />}>
          load in an existing project from a .csv
        </Button>
      </UploadCSV>
      <Button style={buttonStyles} type='text' onClick={() => navigate(Slab2ReuseRoutes.ExampleData)}>
        look at example data
      </Button>
      <Button
        style={buttonStyles}
        type='text'
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
