import { Button, Carousel, Input, Modal } from 'antd';
import { FaImages } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import './caroussel-style.css';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { useCollectionStore } from '../state/collectionStore';
import { ComponentType } from '../types/componentType';
import { ComponentKeyType } from '../enums/componentKeyType';
import { VisualInspectionType } from '../types/visualInspectionType';
import { CollectionName } from '../enums/collectionName';
import { VisualInspectionKeyType } from '../enums/visualInspectionKeyType';
import { LocationKeyType } from '../enums/locationKeyType';

const contentStyle: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: '#ffffff55',
  width: '65svw',
  top: 0,
  color: '#000',
  textAlign: 'center'
};

const imageSyle: React.CSSProperties = {
  maxHeight: '60svh',
  maxWidth: '60svw',
  margin: 'auto'
};

const modalStyle: React.CSSProperties = {
  minHeight: '70svh',
  minWidth: '70svw'
};

const carouselStyle: React.CSSProperties = {
  minHeight: '60svh',
  minWidth: '100%'
};

const VisualInspectionEntry: React.FC<{
  data: VisualInspectionType;
  updateData: (updatedDate: VisualInspectionType) => void;
  deleteData: () => void;
}> = ({ data, updateData, deleteData }) => {
  const [url, setUrl] = useState(data[VisualInspectionKeyType.Img]);
  const [comment, setComment] = useState(data[VisualInspectionKeyType.DamageType]);

  const registerChanges = () =>
    updateData({ ...data, [VisualInspectionKeyType.Img]: url, [VisualInspectionKeyType.DamageType]: comment });

  useEffect(() => {
    setUrl(data[VisualInspectionKeyType.Img]);
    setComment(data[VisualInspectionKeyType.DamageType]);
  }, [data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
      <Input
        value={url}
        placeholder={'paste your url'}
        onChange={(e) => setUrl(e.target.value)}
        onBlur={registerChanges}
        onKeyDown={(e) => e.code === 'Enter' && registerChanges()}
      />
      <Input
        value={comment}
        placeholder={'add your comment'}
        onChange={(e) => setComment(e.target.value)}
        onBlur={registerChanges}
        onKeyDown={(e) => e.code === 'Enter' && registerChanges()}
      />
      <BiTrash size={30} onClick={deleteData} />
    </div>
  );
};

export const VisualInspectionImages: React.FC<{ component: Partial<ComponentType> }> = ({ component }) => {
  const [open, setOpen] = useState(false);

  const updateData = (index: number, updatedData: VisualInspectionType) => {
    const visualInspectionDataCopy = component[ComponentKeyType.VisualInspection]
      ? [...component[ComponentKeyType.VisualInspection]]
      : [];
    visualInspectionDataCopy[index] = updatedData;

    useCollectionStore.getState().updateEntry(CollectionName.Components, {
      ...(component as ComponentType),
      [ComponentKeyType.VisualInspection]: visualInspectionDataCopy
    });
  };

  const deleteData = (index: number) => {
    const vIDC = component[ComponentKeyType.VisualInspection] ? [...component[ComponentKeyType.VisualInspection]] : [];
    useCollectionStore.getState().updateEntry(CollectionName.Components, {
      ...(component as ComponentType),
      [ComponentKeyType.VisualInspection]: [...vIDC.slice(0, index), ...vIDC.slice(index + 1)]
    });
  };

  const addData = () => {
    const visualInspectionDataCopy = component[ComponentKeyType.VisualInspection]
      ? [...component[ComponentKeyType.VisualInspection]]
      : [];
    visualInspectionDataCopy.push({
      [VisualInspectionKeyType.Img]: '',
      [VisualInspectionKeyType.DamageType]: '',
      [VisualInspectionKeyType.Date]: '',
      [VisualInspectionKeyType.UserId]: '',
      [VisualInspectionKeyType.Location]: {
        [LocationKeyType.Height]: 0,
        [LocationKeyType.Longitude]: 0,
        [LocationKeyType.Latitude]: 0
      }
    });
    useCollectionStore.getState().updateEntry(CollectionName.Components, {
      ...(component as ComponentType),
      [ComponentKeyType.VisualInspection]: visualInspectionDataCopy
    });
  };

  return (
    <>
      <Modal
        style={modalStyle}
        open={open}
        onCancel={() => setOpen(false)}
        closable={false}
        onOk={() => setOpen(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Carousel style={carouselStyle} arrows infinite={false}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {component[ComponentKeyType.VisualInspection] &&
                component[ComponentKeyType.VisualInspection].map((data, i) => (
                  <VisualInspectionEntry
                    data={data}
                    updateData={(d) => updateData(i, d)}
                    deleteData={() => deleteData(i)}
                  />
                ))}
              <Button
                onClick={addData}
                style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', width: 150 }}
              >
                <BiPlus size={20} /> add image
              </Button>
            </div>
          </div>
          {component[ComponentKeyType.VisualInspection]
            ? component[ComponentKeyType.VisualInspection].map((data) => {
                return (
                  <div style={{ position: 'relative' }}>
                    {data[VisualInspectionKeyType.Img] !== '' ? (
                      <img style={imageSyle} src={data[VisualInspectionKeyType.Img]}></img>
                    ) : null}
                    <span style={contentStyle}>{data[VisualInspectionKeyType.DamageType]}</span>
                  </div>
                );
              })
            : null}
        </Carousel>
      </Modal>
      <Button onClick={() => setOpen(true)}>
        <FaImages />
      </Button>
    </>
  );
};
