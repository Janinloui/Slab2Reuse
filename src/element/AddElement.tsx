import { Button, Drawer, Form, Input } from 'antd';
import { SlabType } from '../types/slabType';
import { useRef, useState } from 'react';
import { RenderLocal, suffixMap, getType } from '../table/attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { SlabKeyType } from '../enums/attributeNames';
import { BiPlus } from 'react-icons/bi';

export const AddElement: React.FC = () => {
  const [element] = useState<Partial<SlabType>>({});
  const [open, setOpen] = useState(false);
  const formRef = useRef<any>(null);

  function addElement() {
    if (!formRef.current) return;
    const values = formRef.current.getFieldsValue();
    // casting the values that are in the suffix map to numbers
    Object.keys(suffixMap).forEach((k) => (values[k] = Number(values[k])));
    useTableStore.getState().addElement(values as Partial<SlabType>);
    setOpen(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <BiPlus /> add entry
      </Button>
      <Drawer
        onClose={() => setOpen(false)}
        open={open}
        footer={
          <span style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <Button onClick={addElement} type='primary'>
              add element
            </Button>
            <Button onClick={() => setOpen(false)}>cancel</Button>
          </span>
        }
      >
        {open && element ? (
          <Form<Partial<SlabType>> ref={formRef} initialValues={element} title={getType(element)} layout='vertical' autoComplete='off'>
            {Object.values(SlabKeyType)
              .filter((k) => k !== SlabKeyType.Id)
              .map((v) => (
                <Form.Item label={RenderLocal[v as SlabKeyType]} name={v}>
                  <Input />
                </Form.Item>
              ))}
          </Form>
        ) : null}
      </Drawer>
    </>
  );
};
