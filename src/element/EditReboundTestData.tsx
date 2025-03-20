import { Button, InputNumber, Popover } from 'antd';
import { SlabType } from '../types/slabType';
import { getType } from '../table/attributeDefinition';
import { useTableStore } from '../state/tableStore';
import { useEffect, useState } from 'react';
import { LuListPlus } from 'react-icons/lu';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FaHammer } from 'react-icons/fa6';
import { BiCross, BiTrash } from 'react-icons/bi';
import { UploadReboundTestCSV } from '../table/io/UploadReboundTest.Csv';
import DownloadReboundTestCSV from '../table/io/DownloadReboundTestCsv';
import { CgClose } from 'react-icons/cg';

const EditReboundArray: React.FC<{ values: number[]; update: (newNumbers: number[]) => void }> = ({ values, update }) => {
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

export const EditReboundTestData: React.FC<{ element: Partial<SlabType> }> = ({ element }) => {
  const [open, setOpen] = useState(false);

  const updateReboundElementArrayIndex = (index: number, newNumbers: number[]) => {
    const copiedArray = element.reboundTestData ? [...element.reboundTestData] : [];
    copiedArray[index] = newNumbers;
    useTableStore.getState().updateElement(element.id!, { ...element, reboundTestData: copiedArray } as SlabType);
  };

  const deleteLastIndex = () => {
    if (!element.reboundTestData || element.reboundTestData.length === 1)
      useTableStore.getState().updateElement(element.id!, { ...element, reboundTestData: [] } as SlabType);
    else {
      const copiedArray = [...element.reboundTestData];
      copiedArray.pop();
      useTableStore.getState().updateElement(element.id!, { ...element, reboundTestData: copiedArray } as SlabType);
    }
  };

  useEffect(() => {
    setOpen(false);
    return setOpen(false);
  }, []);

  const addArray = () => {
    const copiedArray = element.reboundTestData ? [...element.reboundTestData] : [];
    copiedArray.push([0]);
    useTableStore.getState().updateElement(element.id!, { ...element, reboundTestData: copiedArray } as SlabType);
  };

  return (
    <Popover
      open={open}
      title={`Editing Rebound Test Data for: ${getType(element) ?? element.id}`}
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {element.reboundTestData &&
            element.reboundTestData.map((vs, i, array) =>
              array.length - 1 === i ? (
                <span style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <EditReboundArray key={i} values={vs} update={(newNumbers: number[]) => updateReboundElementArrayIndex(i, newNumbers)} />
                  <BiTrash size={20} onClick={deleteLastIndex} />
                </span>
              ) : (
                <EditReboundArray key={i} values={vs} update={(newNumbers: number[]) => updateReboundElementArrayIndex(i, newNumbers)} />
              )
            )}
          <LuListPlus size={20} onClick={addArray} />
          <span style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
            <Button onClick={() => setOpen(false)}>
              <CgClose size={20} /> close
            </Button>
            <DownloadReboundTestCSV element={element as SlabType} />
            <UploadReboundTestCSV element={element as SlabType} setElement={(e) => useTableStore.getState().updateElement(element.id!, e)} />
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
