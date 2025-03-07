import { Select } from 'antd';
import { UserCategory } from '../enums/user';
import { useTableStore } from '../state/tableStore';

export const UserSelect: React.FC = () => {
  const activeGlobalUserCategory = useTableStore((s) => s.userCategory);

  return (
    <Select value={activeGlobalUserCategory} onChange={(v) => useTableStore.getState().setUserCategory(v)}>
      {Object.values(UserCategory).map((category) => (
        <Select.Option value={category}>{category}</Select.Option>
      ))}
    </Select>
  );
};
