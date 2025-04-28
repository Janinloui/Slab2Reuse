import { Select } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Slab2ReuseRoutes } from '../enums/routes';
import { useTableStore } from '../state/tableStore';
import { NamedViews } from '../enums/viewer';

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
        justifyItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#9fcdf5',
        color: 'white'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8
        }}
      >
        <div style={{ display: 'flex', justifyItems: 'center' }}>Slab2Reuse 💫</div>
        <nav style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <a href='/' style={{ color: '#d15232' }}>
            Home
          </a>
          <a href={import.meta.env.BASE_URL + `/#` + Slab2ReuseRoutes.TableOnly} style={{ color: '#d15232' }}>
            Table
          </a>
          <a href={import.meta.env.BASE_URL + `/#` + Slab2ReuseRoutes.ThreeOnly} style={{ color: '#d15232' }}>
            Three
          </a>
        </nav>
      </div>
      <div style={{ gap: 8, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Select
          style={{ width: 200 }}
          value={viewer}
          variant='filled'
          onChange={(e) => useTableStore.getState().setViewer(e)}
        >
          {Object.values(NamedViews).map((e) => (
            <Select.Option key={e} value={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
        <Select style={{ width: 80 }} variant='filled' value={location.pathname} onChange={(v) => navigate(v)}>
          <Select.Option value={Slab2ReuseRoutes.Viewer}>viewer</Select.Option>
          <Select.Option value={Slab2ReuseRoutes.TableOnly}>table</Select.Option>
          <Select.Option value={Slab2ReuseRoutes.ThreeOnly}>3d</Select.Option>
        </Select>
      </div>
    </header>
  );
};
