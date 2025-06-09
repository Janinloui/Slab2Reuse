import { Button, Checkbox, Drawer, Radio } from 'antd';
import { useTableStore } from '../state/tableStore';
import { useEffect, useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { AllKeysWithColumnDefined, NamedViews } from '../enums/viewer';

export const ActiveSettings: React.FC = () => {
  const globalActiveUserCategory = useTableStore((s) => s.viewer);
  const attributeMap = useTableStore((s) => s.viewerAttributeMap);
  const [viewer, setUserCategory] = useState(globalActiveUserCategory);
  const [activeStrings, setActiveStrings] = useState(new Set(attributeMap[globalActiveUserCategory]));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActiveStrings(new Set(attributeMap[viewer]));
  }, [viewer, attributeMap]);

  const onChange = (attribute: any) => {
    activeStrings.has(attribute) ? activeStrings.delete(attribute) : activeStrings.add(attribute);
    useTableStore.getState().setViewerAttributeMap(
      viewer,
      AllKeysWithColumnDefined.filter((s) => activeStrings.has(s as any))
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
          onChange={(e) => setUserCategory(e.target.value as NamedViews)}
          value={viewer}
          options={Object.values(NamedViews).map((value) => ({ label: value, value }))}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {AllKeysWithColumnDefined.map((s) => (
            <span
              key={s}
              style={{ paddingTop: 12, display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}
            >
              <Checkbox onChange={() => onChange(s)} checked={activeStrings.has(s as any)} />
              {s}
            </span>
          ))}
        </div>
      </Drawer>
    </>
  );
};

//allowes users to cstomize the table view in the UI
