import { Button, Select } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Slab2ReuseRoutes } from '../enums/routes';
import { useTableStore } from '../state/tableStore';
import { NamedViews } from '../enums/viewer';

const options = [
  { value: Slab2ReuseRoutes.Viewer, label: 'Both' },
  { value: Slab2ReuseRoutes.TableOnly, label: 'Table' },
  { value: Slab2ReuseRoutes.ThreeOnly, label: '3D' }
];

/**
 * Header Component
 * This component is responsible for rendering the header of the application.
 * It includes the logo, navigation links, and any other relevant information.
 * @returns {JSX.Element} The rendered header component.
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const viewer = useTableStore((s) => s.viewer);

  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
        backgroundColor: '#9fcdf5',
        color: 'white'
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
        <Button variant='filled' color='geekblue' onClick={() => navigate(Slab2ReuseRoutes.Landing)}>
          Slab2Reuse 💫
        </Button>
        {options.map(({ value, label }) => (
          <Button variant='solid' key={value} color='geekblue' onClick={() => navigate(value)}>
            {label}
          </Button>
        ))}
      </nav>
      <div style={{ gap: 8, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Select
          style={{ width: 200 }}
          value={viewer}
          variant='filled'
          onChange={(e) => useTableStore.getState().setViewer(e)}
          options={Object.values(NamedViews).map((e) => ({ value: e, label: e }))} // Use NamedViews enum for options
        />
        <Select variant='filled' value={location.pathname} onChange={(v) => navigate(v)} options={options} />
      </div>
    </header>
  );
};
