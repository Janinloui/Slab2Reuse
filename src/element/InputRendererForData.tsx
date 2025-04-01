import { Input, InputNumber, Select } from 'antd';
import { SlabKeyType } from '../enums/componentKeyType';
import { VisualCondition } from '../enums/visualCondition';
import { suffixMap } from '../table/attributeDefinition';
import { VisualConditionTag } from '../table/VisualConditionTag';
import { SlabTypeValueMap } from '../types/componentType';

export const InputRendererForData = (attributeName: SlabKeyType) => {
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
