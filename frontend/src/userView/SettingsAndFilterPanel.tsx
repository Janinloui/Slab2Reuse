import { ActiveSettings } from './ActiveSettingsUI';
import { UserSelect } from './UserSelect';

export const SettingsAndFilterPanel: React.FC = () => (
  <div
    style={{
      display: 'flex',
      top: 0,
      right: '50%',
      left: 0,
      padding: 10,
      position: 'fixed',
      zIndex: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      gap: 12
    }}
  >
    <ActiveSettings />
    <UserSelect />
  </div>
);
