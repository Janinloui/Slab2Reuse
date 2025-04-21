import { Button, Drawer, Form } from 'antd';
import { SlabType } from '../types/componentType';
import { useRef, useState } from 'react';
import { DefaultRenderValues, RenderLocal, getType } from '../table/attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { SlabKeyType } from '../enums/componentKeyType';
import { InputRendererForData } from './InputRendererForData';

export const EditElement: React.FC<{ element: Partial<SlabType> }> = ({ element }) => {
  const activeGlobalUserCategory = useTableStore((s) => s.viewer);
  const [open, setOpen] = useState(false);
  const formRef = useRef<any>(null);

  const updateElement = () => {
    if (!formRef.current) return;
    const values = formRef.current.getFieldsValue();
    useTableStore.getState().updateElement(element.id!, values as SlabType);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>edit element</Button>
      <Drawer
        onClose={() => setOpen(false)}
        open={open}
        footer={
          <span style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <Button onClick={updateElement} type='primary'>
              apply changes to element
            </Button>
            <Button onClick={() => setOpen(false)}>cancel</Button>
          </span>
        }
      >
        {open && element ? (
          <Form<Partial<SlabType>> ref={formRef} initialValues={element} title={getType(element)} layout='vertical' autoComplete='off'>
            {DefaultRenderValues[activeGlobalUserCategory].map((v) =>
              Object.values(SlabKeyType)
                .filter((v) => RenderLocal[v] !== undefined)
                .includes(v as SlabKeyType) ? (
                <Form.Item label={RenderLocal[v as SlabKeyType]} name={v}>
                  {InputRendererForData(v as SlabKeyType)}
                </Form.Item>
              ) : null
            )}
          </Form>
        ) : null}
      </Drawer>
    </>
  );
};
