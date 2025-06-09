import { Select } from 'antd';
import { UserCategory } from '../enums/user';
import { useTableStore } from '../state/tableStore';

export const UserSelect: React.FC = () => {
  const viewer = useTableStore((s) => s.viewer);

  return (
    <Select value={viewer} onChange={(v) => useTableStore.getState().setViewer(v)}>
      {Object.values(UserCategory).map((category) => (
        <Select.Option key={category} value={category}>
          {category}
        </Select.Option>
      ))}
    </Select>
  );
};

//dopdown menu for selecting the user category