import { Button, Select } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Slab2ReuseRoutes, Slab2ReuseRouteLocal } from '../enums/routes';
import { useTableStore } from '../state/tableStore';
import { NamedViews, NamedViewsLocal } from '../enums/viewer';

const options = [Slab2ReuseRoutes.Viewer, Slab2ReuseRoutes.TableOnly, Slab2ReuseRoutes.ThreeOnly].map((value) => ({
  value,
  label: Slab2ReuseRouteLocal[value]
}));

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
          style={{ width: 160 }}
          value={viewer}
          variant='filled'
          onChange={(e) => useTableStore.getState().setViewer(e)}
          options={Object.values(NamedViews).map((e) => ({ value: e, label: NamedViewsLocal[e] }))} // Use NamedViews enum for options
        />
        <Select
          style={{ width: 120 }}
          variant='filled'
          value={location.pathname}
          onChange={(v) => navigate(v)}
          options={options}
        />
      </div>
    </header>
  );
};
