import { Button, Descriptions, Input, InputNumber, Popover, Select } from 'antd';
import { ComponentCategory } from '../enums/componentCategory';
import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { MaterialCategory } from '../enums/materialCategory';
import { RebarCategory } from '../enums/rebarCategory';
import { UserCategory } from '../enums/user';
import { ValueType } from '../types/valueType';
import { AllKeyMap } from '../types/allKeyMap';
import { ReactNode, useState } from 'react';
import { VisualCondition } from '../enums/visualCondition';
import { IdKeys, IdKeysCollectionMap, IdKeysType } from '../types/idKeyMap';
import { useCollectionStore } from '../state/collectionStore';
import { CollectionName } from '../enums/collectionName';
import { BuildingType } from '../types/buildingType';
import { BuildingKeyType } from '../enums/buildingKeyType';
import { RebarType } from '../types/rebarType';
import { RebarKeyType } from '../enums/rebarKeyType';
import { MaterialType } from '../types/materialType';
import { MaterialKeyType } from '../enums/materialKeyType';
import { CrossSectionType } from '../types/crossSectionType';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { GeometryType } from '../types/geometryType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { ComponentKeyType } from '../enums/componentKeyType';
import { ComponentType } from '../types/componentType';
import { UserType } from '../types/userType';
import { UserKeyType } from '../enums/userKeyType';
import { MissingData } from '../table/MissingData';

const EditableNumberRenderer = (v: number, onChange: (e: any) => void) => {
  const [localValue, setLocalValue] = useState<number | null>(v);

  return (
    <InputNumber
      value={v}
      onBlur={() => onChange(localValue ?? undefined)}
      onKeyDown={(e) => e.code === 'Enter' && onChange(localValue ?? undefined)}
      onChange={setLocalValue}
    />
  );
};

//number
const NumberRenderer = (v: number, onChange?: (e: any) => void) =>
  onChange ? EditableNumberRenderer(v, onChange) : <InputNumber disabled variant='borderless' value={v} />;

const EditableStringRenderer = (v: string, onChange: (e: any) => void) => {
  const [localValue, setLocalValue] = useState<string | null>(v);

  return (
    <InputNumber
      value={v}
      onBlur={() => onChange(localValue ?? undefined)}
      onKeyDown={(e) => e.code === 'Enter' && onChange(localValue ?? undefined)}
      onChange={setLocalValue}
    />
  );
};

//string
const StringRenderer = (v: string, onChange?: (e: any) => void) =>
  onChange ? EditableStringRenderer(v, onChange) : <Input disabled variant='borderless' value={v} />;

//stringPair
const StringPairRenderer = (v: [string, string], onChange?: (e: any) => void) => (
  <div>
    <Input value={v[0]} />
    <Input value={v[1]} />
  </div>
);

const CategorySelect: React.FC<{ vs: string[]; v: string; onChange?: (e: any) => void }> = ({ vs, v, onChange }) => (
  <Select disabled={!onChange} variant={onChange ? undefined : 'borderless'} value={v}>
    {vs.map((c) => (
      <Select.Option key={c} value={c}>
        {c}
      </Select.Option>
    ))}
  </Select>
);

const SimpleValue: React.FC<{ k: string; v: ReactNode }> = ({ k, v }) => (
  <span style={{ display: 'flex', flex: 'row', gap: 4, alignItems: 'center' }}>{v}</span>
);

const removeArrayFromEnd = (s: string) => s.substring(0, s.lastIndexOf('Array'));

const ArrayRenderer: React.FC<{ items: any[]; valueType: ValueType }> = ({ items, valueType }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {items.map((item, i) => (
      <EntryRenderer key={i} k={i.toString()} valueType={valueType} value={item} />
    ))}
  </div>
);

const ObjectRender: React.FC<{ label: string; value: any }> = ({ label: k, value }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <GenericUIRenderer item={value} label={k} />
          <Button type='primary' onClick={() => setOpen(false)}>
            close
          </Button>
        </div>
      }
    >
      <Button onClick={() => setOpen(true)}>{k}</Button>
    </Popover>
  );
};

const findMethodMap = {
  [CollectionName.Buildings]: (e: BuildingType, id: string) => e[BuildingKeyType.Id] === id,
  [CollectionName.Users]: (e: UserType, id: string) => e[UserKeyType.Id] === id,
  [CollectionName.Components]: (e: ComponentType, id: string) => e[ComponentKeyType.Id] === id,
  [CollectionName.Geometries]: (e: GeometryType, id: string) => e[GeometryKeyType.Id] === id,
  [CollectionName.CrossSections]: (e: CrossSectionType, id: string) => e[CrossSectionKeyType.Id] === id,
  [CollectionName.Materials]: (e: MaterialType, id: string) => e[MaterialKeyType.Id] === id,
  [CollectionName.Rebars]: (e: RebarType, id: string) => e[RebarKeyType.Id] === id
};

const IdRerenceRenderer: React.FC<{ idType: IdKeysType; id: string }> = ({ idType, id }) => {
  const collections = useCollectionStore((state) => state.collections);
  const entry = collections[IdKeysCollectionMap[idType]].find((e) =>
    findMethodMap[IdKeysCollectionMap[idType]](e as any, id)
  );

  return entry ? <ObjectRender label={id} value={entry} /> : <MissingData />;
};

export const EntryRenderer: React.FC<{ k: string; valueType: ValueType; value: any; onChange?: (e: any) => void }> = ({
  k,
  valueType,
  value: v,
  onChange
}) => {
  if (valueType.endsWith('Array'))
    return <ArrayRenderer items={v} valueType={removeArrayFromEnd(valueType) as ValueType} />;

  switch (valueType) {
    case 'number':
      return <SimpleValue k={k} v={NumberRenderer(v as any)} />;
    case 'string':
      if (IdKeys.includes(k as IdKeysType)) return <IdRerenceRenderer idType={k as IdKeysType} id={v} />;
      return <SimpleValue k={k} v={StringRenderer(v as any)} />;
    case 'UserCategory':
      return <SimpleValue k={k} v={<CategorySelect v={v} onChange={onChange} vs={Object.values(UserCategory)} />} />;
    case 'MaterialCategory':
      return (
        <SimpleValue k={k} v={<CategorySelect v={v} onChange={onChange} vs={Object.values(MaterialCategory)} />} />
      );
    case 'CrossSectionCategory':
      return (
        <SimpleValue k={k} v={<CategorySelect v={v} onChange={onChange} vs={Object.values(CrossSectionCategory)} />} />
      );
    case 'ComponentCategory':
      return (
        <SimpleValue k={k} v={<CategorySelect v={v} onChange={onChange} vs={Object.values(ComponentCategory)} />} />
      );
    case 'RebarCategory':
      return <SimpleValue k={k} v={<CategorySelect v={v} onChange={onChange} vs={Object.values(RebarCategory)} />} />;
    case 'VisualCondition':
      return <SimpleValue k={k} v={<CategorySelect v={v} onChange={onChange} vs={Object.values(VisualCondition)} />} />;
    case 'stringPair':
      return <SimpleValue k={k} v={StringPairRenderer(v as any)} />;
    default:
      return <ObjectRender label={k} value={v} />;
  }
};

const RawGenericUIRenderer: React.FC<{ item: Record<string, any> }> = ({ item }) =>
  Object.entries(item).map(([k, value]) => {
    const valueType = AllKeyMap[k];
    return (
      <Descriptions.Item label={k}>
        <EntryRenderer k={k} value={value} valueType={valueType} />
      </Descriptions.Item>
    );
  });

export const GenericUIRenderer: React.FC<{ item: Record<string, any>; label: string }> = ({ item, label }) => (
  <Descriptions
    size='small'
    bordered
    column={1}
    title={label}
    items={Object.entries(item).map(([key, value]) => ({
      key,
      label: key,
      children: <EntryRenderer k={key} value={value} valueType={AllKeyMap[key]} />
    }))}
  />
);
