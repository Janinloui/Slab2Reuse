import { Button, Checkbox, Drawer, Radio } from 'antd';
import { UserCategory } from '../enums/user';
import { useTableStore } from '../state/tableStore';
import { useEffect, useState } from 'react';
import { AllDefinedRenders, RenderLocal } from '../table/attributeDefinition';
import { IoSettingsSharp } from 'react-icons/io5';

export const ActiveSettings: React.FC = () => {
  const globalActiveUserCategory = useTableStore((s) => s.userCategory);
  const attributeMap = useTableStore((s) => s.userAttributeMap);
  const [userCategory, setUserCategory] = useState(globalActiveUserCategory);
  const [activeStrings, setActiveStrings] = useState(new Set(attributeMap[globalActiveUserCategory]));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActiveStrings(new Set(attributeMap[userCategory]));
  }, [userCategory, attributeMap]);

  const onChange = (attribute: string) => {
    activeStrings.has(attribute) ? activeStrings.delete(attribute) : activeStrings.add(attribute);
    useTableStore.getState().setUserAttributeMap(
      userCategory,
      AllDefinedRenders.filter((s) => activeStrings.has(s))
    );
    setActiveStrings(activeStrings);
  };

  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        <span style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          <IoSettingsSharp />
          edit table view
        </span>
      </Button>
      <Drawer open={open} width={509} mask={false} placement='right' onClose={() => setOpen(false)}>
        <Radio.Group
          optionType='button'
          onChange={(e) => setUserCategory(e.target.value as UserCategory)}
          value={userCategory}
          options={Object.values(UserCategory).map((value) => ({ label: value, value }))}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {AllDefinedRenders.map((s) => (
            <span style={{ paddingTop: 12, display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <Checkbox onChange={() => onChange(s)} checked={activeStrings.has(s)} />
              {RenderLocal[s]}
            </span>
          ))}
        </div>
      </Drawer>
    </>
  );
};
