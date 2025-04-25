import { Button, InputNumber, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { LuListPlus } from 'react-icons/lu';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FaHammer } from 'react-icons/fa6';
import { BiTrash } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { ComponentType } from '../types/componentType';
import { ComponentKeyType } from '../enums/componentKeyType';
import { useCollectionStore } from '../state/collectionStore';
import { CollectionName } from '../enums/collectionName';
import { ReboundTestKeyType } from '../enums/reboundTestKeyType';
import { LocationKeyType } from '../enums/locationKeyType';

const EditReboundArray: React.FC<{ values: number[]; update: (newNumbers: number[]) => void }> = ({
  values,
  update
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
      {values.map((v, i) => (
        <InputNumber
          value={v}
          onChange={(v) => {
            const copiedArray = [...values];
            copiedArray[i] = v ?? 0.0;
            update(copiedArray);
          }}
          key={i}
        />
      ))}
      <FiPlus size={20} onClick={() => update([...values, 0])} />
      {values.length > 1 ? <FiMinus size={20} onClick={() => update([...values.slice(0, -1)])} /> : null}
    </div>
  );
};

export const EditReboundTestData: React.FC<{ component: Partial<ComponentType> }> = ({ component }) => {
  const [open, setOpen] = useState(false);

  const updateReboundElementArrayIndex = (index: number, newNumbers: number[]) => {
    const copiedArray = component[ComponentKeyType.ReboundTest] ? [...component[ComponentKeyType.ReboundTest]] : [];
    copiedArray[index][ReboundTestKeyType.ReboundValue] = newNumbers;
    useCollectionStore
      .getState()
      .updateEntry(CollectionName.Components, {
        ...(component as ComponentType),
        [ComponentKeyType.ReboundTest]: copiedArray
      });
  };

  const deleteLastIndex = () => {
    if (!component[ComponentKeyType.ReboundTest] || component[ComponentKeyType.ReboundTest].length === 1)
      useCollectionStore
        .getState()
        .updateEntry(CollectionName.Components, {
          ...(component as ComponentType),
          [ComponentKeyType.ReboundTest]: []
        });
    else {
      const copiedArray = [...component[ComponentKeyType.ReboundTest]];
      copiedArray.pop();
      useCollectionStore
        .getState()
        .updateEntry(CollectionName.Components, {
          ...(component as ComponentType),
          [ComponentKeyType.ReboundTest]: copiedArray
        });
    }
  };

  useEffect(() => {
    setOpen(false);
    return setOpen(false);
  }, []);

  const addArray = () => {
    const copiedArray = component[ComponentKeyType.ReboundTest] ? [...component[ComponentKeyType.ReboundTest]] : [];
    copiedArray.push({
      [ReboundTestKeyType.ReboundValue]: [],
      [ReboundTestKeyType.ReboundDate]: '',
      [ReboundTestKeyType.UserId]: '',
      [ReboundTestKeyType.Location]: {
        [LocationKeyType.Height]: 0,
        [LocationKeyType.Longitude]: 0,
        [LocationKeyType.Latitude]: 0
      }
    });
    useCollectionStore
      .getState()
      .updateEntry(CollectionName.Components, {
        ...(component as ComponentType),
        [ComponentKeyType.ReboundTest]: copiedArray
      });
  };

  return (
    <Popover
      open={open}
      title={`Editing Rebound Test Data for: ${component[ComponentKeyType.GeometryTypeId]}`}
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {component[ComponentKeyType.ReboundTest] &&
            component[ComponentKeyType.ReboundTest].map((reboundTest, i, array) =>
              array.length - 1 === i ? (
                <span style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <EditReboundArray
                    key={i}
                    values={reboundTest[ReboundTestKeyType.ReboundValue]}
                    update={(newNumbers: number[]) => updateReboundElementArrayIndex(i, newNumbers)}
                  />
                  <BiTrash size={20} onClick={deleteLastIndex} />
                </span>
              ) : (
                <EditReboundArray
                  key={i}
                  values={reboundTest[ReboundTestKeyType.ReboundValue]}
                  update={(newNumbers: number[]) => updateReboundElementArrayIndex(i, newNumbers)}
                />
              )
            )}
          <LuListPlus size={20} onClick={addArray} />
          <span style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
            <Button onClick={() => setOpen(false)}>
              <CgClose size={20} /> close
            </Button>
          </span>
        </div>
      }
      destroyTooltipOnHide
    >
      <Button onClick={() => setOpen(!open)}>
        <FaHammer size={20} />
      </Button>
    </Popover>
  );
};
