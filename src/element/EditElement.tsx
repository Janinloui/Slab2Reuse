import { Button, Drawer, Form, Input, InputNumber, Select } from 'antd';
import { SlabType, SlabTypeValueMap } from '../types/slabType';
import { useRef, useState } from 'react';
import { DefaultRenderValues, RenderLocal, suffixMap, getType } from '../table/attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { SlabKeyType } from '../enums/attributeNames';
import { VisualCondition } from '../enums/visualCondition';
import { VisualConditionTag } from '../table/VisualConditionTag';

const InputRendererForData = (attributeName: SlabKeyType) => {
  switch (SlabTypeValueMap[attributeName]) {
    case 'string':
      return <Input />;
    case 'number':
      return <InputNumber addonAfter={suffixMap[attributeName]} />;
    case 'enum':
      switch (attributeName) {
        case SlabKeyType.Condition:
          return (
            <Select>
              {Object.values(VisualCondition).map((v) => (
                <Select.Option key={v} value={v} label={v} children={<VisualConditionTag condition={v} />} />
              ))}
            </Select>
          );
      }
    default:
      return null;
  }
};

export const EditElement: React.FC<{ element: Partial<SlabType> }> = ({ element }) => {
  const activeGlobalUserCategory = useTableStore((s) => s.userCategory);
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
              edit element
            </Button>
            <Button onClick={() => setOpen(false)}>cancel</Button>
          </span>
        }
      >
        {open && element ? (
          <Form<Partial<SlabType>> ref={formRef} initialValues={element} title={getType(element)} layout='vertical' autoComplete='off'>
            {DefaultRenderValues[activeGlobalUserCategory].map((v) =>
              Object.values(SlabKeyType).includes(v as SlabKeyType) ? (
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
