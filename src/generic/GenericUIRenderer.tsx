import { Input, InputNumber, Select } from 'antd';
import { ComponentCategory } from '../enums/componentCategory';
import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { MaterialCategory } from '../enums/materialCategory';
import { RebarCategory } from '../enums/rebarCategory';
import { UserCategory } from '../enums/user';
import { ValueType } from '../types/valueType';
import { AllKeyMap } from '../types/allKeyMap';
import { ReactNode } from 'react';

//number
const NumberRenderer = (v: number) => <InputNumber value={v} />;

//string
const StringRenderer = (v: string) => <Input value={v} />;

//stringPair
const StringPairRenderer = (v: [string, string]) => (
  <div>
    <Input value={v[0]} />
    <Input value={v[1]} />
  </div>
);

//UserCategory
const UserCategoryRenderer = (v: UserCategory) => (
  <Select value={v}>
    {Object.values(UserCategory).map((c) => (
      <Select.Option value={c}>{c}</Select.Option>
    ))}
  </Select>
);

//MaterialCategory
const MaterialCategoryRenderer = (v: MaterialCategory) => (
  <Select value={v}>
    {Object.values(MaterialCategory).map((c) => (
      <Select.Option value={c}>{c}</Select.Option>
    ))}
  </Select>
);

//CrossSectionCategory
const CrossSectionCategoryRenderer = (v: CrossSectionCategory) => (
  <Select value={v}>
    {Object.values(CrossSectionCategory).map((c) => (
      <Select.Option value={c}>{c}</Select.Option>
    ))}
  </Select>
);

//ComponentCategory
const ComponentCategoryRenderer = (v: ComponentCategory) => (
  <Select value={v}>
    {Object.values(ComponentCategory).map((c) => (
      <Select.Option value={c}>{c}</Select.Option>
    ))}
  </Select>
);

//RebarCategory
const RebarCategoryRenderer = (v: RebarCategory) => (
  <Select value={v}>
    {Object.values(RebarCategory).map((c) => (
      <Select.Option value={c}>{c}</Select.Option>
    ))}
  </Select>
);

const SimpleValue: React.FC<{ k: string; v: ReactNode }> = ({ k, v }) => (
  <span style={{ display: 'flex', flex: 'row', gap: 4, alignItems: 'center' }}>
    {k}
    {v}
  </span>
);

const removeArrayFromEnd = (s: string) => {
  s.replaceAll();
};

const ArrayRenderer: React.FC = (items: any[], valueType: ValueType) => (
  <div>
    {items.map((item, i) => (
      <EntryRenderer k={i.toString()} valueType={valueType} value={item} />
    ))}
  </div>
);

const EntryRenderer: React.FC<{ k: string; valueType: ValueType; value: any }> = ({ k, valueType, value }) => {
  if (valueType.endsWith('Array')) return ArrayRenderer(value, valueType.replace());
  switch (valueType) {
    case 'number':
      return <SimpleValue k={k} v={NumberRenderer(value as any)} />;
    case 'string':
      return <SimpleValue k={k} v={StringRenderer(value as any)} />;
    case 'UserCategory':
      return <SimpleValue k={k} v={UserCategoryRenderer(value as any)} />;
    case 'MaterialCategory':
      return <SimpleValue k={k} v={MaterialCategoryRenderer(value as any)} />;
    case 'CrossSectionCategory':
      return <SimpleValue k={k} v={CrossSectionCategoryRenderer(value as any)} />;
    case 'ComponentCategory':
      return <SimpleValue k={k} v={ComponentCategoryRenderer(value as any)} />;
    case 'RebarCategory':
      return <SimpleValue k={k} v={RebarCategoryRenderer(value as any)} />;
    case 'stringPair':
      return <SimpleValue k={k} v={StringPairRenderer(value as any)} />;
  }
};

export const GenericUIRenderer: React.FC<{ item: Record<string, any>; keyOverwrite: ValueType }> = ({ item, keyOverwrite }) => (
  <>
    {Object.entries(item).map(([k, value]) => {
      const valueType = AllKeyMap[k];
      if (valueType === undefined) return 'some problem';
    })}
  </>
);
