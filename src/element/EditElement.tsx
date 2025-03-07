import { Button, Drawer, Form, Input } from 'antd';
import { SlabType } from '../types/slabType';
import { useRef, useState } from 'react';
import { DefaultRenderValues, PartTypeKeys, RenderLocal, suffixMap, typeRenderer } from '../table/attributeDefinition';
import { useTableStore } from '../state/tableStore';

export const EditElement: React.FC<{ element: SlabType }> = ({ element }) => {
  const activeGlobalUserCategory = useTableStore((s) => s.userCategory);
  const [open, setOpen] = useState(false);
  const formRef = useRef<any>(null);

  function updateElement() {
    if (!formRef.current) return;
    const values = formRef.current.getFieldsValue();
    // casting the values that are in the suffix map to numbers
    Object.keys(suffixMap).forEach((k) => (values[k] = Number(values[k])));
    useTableStore.getState().updateElement(values as SlabType);
    setOpen(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>edit element</Button>
      <Drawer
        onClose={() => setOpen(false)}
        open={open}
        footer={
          <span className='flex gap-4 py-2'>
            <Button onClick={updateElement} type='primary'>
              edit element
            </Button>
            <Button onClick={() => setOpen(false)}>cancel</Button>
          </span>
        }
      >
        {open && element ? (
          <Form<Partial<SlabType>> ref={formRef} initialValues={element} title={typeRenderer(element)} layout='vertical' autoComplete='off'>
            {DefaultRenderValues[activeGlobalUserCategory].map((v) =>
              PartTypeKeys.includes(v) ? (
                <Form.Item label={RenderLocal[v]} name={v}>
                  <Input />
                </Form.Item>
              ) : null
            )}
          </Form>
        ) : null}
      </Drawer>
    </>
  );
};
