import { useNavigate } from 'react-router-dom';
import { Slab2ReuseRoutes } from './enums/routes';
import { Button } from 'antd';
import { CSSProperties } from 'react';
import { CiViewTable } from 'react-icons/ci';
import { LuBrickWall } from 'react-icons/lu';

const buttonStyles: CSSProperties = {
  justifyContent: 'left',
  width: 450,
  padding: 30,
  fontSize: 20
};

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span
        style={{ fontSize: 25, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', paddingLeft: 30 }}
      >
        Welcome to <p style={{ fontWeight: 'bold' }}>Slab2Reuse</p> 💫
      </span>
      <Button
        style={buttonStyles}
        type='text'
        onClick={() => navigate(Slab2ReuseRoutes.TableOnly)}
        icon={<CiViewTable />}
      >
        look at the table view
      </Button>
      <Button
        style={buttonStyles}
        type='text'
        onClick={() => navigate(Slab2ReuseRoutes.ThreeOnly)}
        icon={<LuBrickWall />}
      >
        look at the 3d view
      </Button>
    </div>
  );
};
