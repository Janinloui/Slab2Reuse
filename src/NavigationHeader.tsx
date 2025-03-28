import { Button, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Slab2ReuseRoutes } from './enums/routes';

export const NavigationHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        display: 'flex',
        top: 0,
        left: '50%',
        right: 0,
        padding: 10,
        position: 'fixed',
        zIndex: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
      }}
    >
      <Button onClick={() => navigate(Slab2ReuseRoutes.Landing)}>landing</Button>
      <Select value={location.pathname} onChange={(v) => navigate(v)}>
        <Select.Option value={Slab2ReuseRoutes.Viewer}>viewer</Select.Option>
        <Select.Option value={Slab2ReuseRoutes.TableOnly}>table</Select.Option>
        <Select.Option value={Slab2ReuseRoutes.ThreeOnly}>3d</Select.Option>
      </Select>
      <Button onClick={() => navigate(Slab2ReuseRoutes.ExampleData)}>example data</Button>
    </div>
  );
};
