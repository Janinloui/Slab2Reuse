import { Button, Input, InputNumber, Popover, Select } from 'antd';
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

//RebarCategory
const VisualConditionRenderer = (v: VisualCondition) => (
  <Select value={v}>
    {Object.values(VisualCondition).map((c) => (
      <Select.Option value={c}>{c}</Select.Option>
    ))}
  </Select>
);

const SimpleValue: React.FC<{ k: string; v: ReactNode }> = ({ k, v }) => (
  <span style={{ display: 'flex', flex: 'row', gap: 4, alignItems: 'center' }}>{v}</span>
);

const removeArrayFromEnd = (s: string) => s.substring(0, s.lastIndexOf('Array'));

const ArrayRenderer: React.FC<{ items: any[]; valueType: ValueType }> = ({ items, valueType }) => (
  <div style={{ marginLeft: 4 }}>
    {items.map((item, i) => (
      <EntryRenderer k={i.toString()} valueType={valueType} value={item} />
    ))}
  </div>
);

const ObjectRender: React.FC<{ name: string; value: any }> = ({ name: k, value }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      content={
        <>
          <GenericUIRenderer item={value} />
          <Button type='primary' onClick={() => setOpen(false)}>
            close
          </Button>
        </>
      }
      title={k}
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

  return entry ? <ObjectRender name={id} value={entry} /> : <MissingData />;
};

export const EntryRenderer: React.FC<{ k: string; valueType: ValueType; value: any }> = ({ k, valueType, value }) => {
  if (valueType.endsWith('Array'))
    return <ArrayRenderer items={value} valueType={removeArrayFromEnd(valueType) as ValueType} />;

  switch (valueType) {
    case 'number':
      return <SimpleValue k={k} v={NumberRenderer(value as any)} />;
    case 'string':
      if (IdKeys.includes(k as IdKeysType)) return <IdRerenceRenderer idType={k as IdKeysType} id={value} />;
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
    case 'VisualCondition':
      return <SimpleValue k={k} v={VisualConditionRenderer(value as any)} />;
    case 'stringPair':
      return <SimpleValue k={k} v={StringPairRenderer(value as any)} />;
    default:
      return <ObjectRender name={k} value={value} />;
  }
};

export const GenericUIRenderer: React.FC<{ item: Record<string, any>; isFirst?: boolean }> = ({
  item,
  isFirst = false
}) => (
  <div
    style={{
      borderLeft: isFirst ? undefined : '1px solid black',
      paddingLeft: 4,
      marginLeft: 4,
      display: 'grid',
      gridTemplateColumns: '1fr 4fr',
      gap: 12,
      alignItems: 'center'
    }}
  >
    {Object.entries(item).map(([k, value]) => {
      const valueType = AllKeyMap[k];
      if (typeof valueType !== 'string') return `some problem: '${typeof valueType}' for key: '${k}'`;
      return (
        <>
          <span>{k}</span>
          <EntryRenderer k={k} value={value} valueType={valueType} />
        </>
      );
    })}
  </div>
);
