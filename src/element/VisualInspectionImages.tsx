import { Button, Carousel, Input, Modal } from 'antd';
import { SlabType } from '../types/slabType';
import { FaImages } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import './caroussel-style.css';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { useTableStore } from '../state/tableStore';

const contentStyle: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: '#ffffff55',
  width: '65svw',
  top: 0,
  color: '#000',
  textAlign: 'center',
};

const imageSyle: React.CSSProperties = {
  maxHeight: '60svh',
  maxWidth: '60svw',
  margin: 'auto',
};

const modalStyle: React.CSSProperties = {
  minHeight: '70svh',
  minWidth: '70svw',
};

const carouselStyle: React.CSSProperties = {
  minHeight: '60svh',
  minWidth: '100%',
};

const VisualInspectionEntry: React.FC<{ data: [string, string]; updateData: (updatedDate: [string, string]) => void; deleteData: () => void }> = ({
  data,
  updateData,
  deleteData,
}) => {
  const [url, setUrl] = useState(data[0]);
  const [comment, setComment] = useState(data[1]);

  const registerChanges = () => updateData([url, comment]);

  useEffect(() => {
    setUrl(data[0]);
    setComment(data[1]);
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

export const VisualInspectionImages: React.FC<{ element: Partial<SlabType> }> = ({ element }) => {
  const [open, setOpen] = useState(false);

  const updateData = (index: number, updatedData: [string, string]) => {
    const visualInspectionDataCopy = element.visualInspectionImages ? [...element.visualInspectionImages] : [];
    visualInspectionDataCopy[index] = updatedData;

    useTableStore.getState().updateElement(element.id!, { ...element, visualInspectionImages: visualInspectionDataCopy });
  };

  const deleteData = (index: number) => {
    const vIDC = element.visualInspectionImages ? [...element.visualInspectionImages] : [];
    useTableStore.getState().updateElement(element.id!, { ...element, visualInspectionImages: [...vIDC.slice(0, index), ...vIDC.slice(index + 1)] });
  };

  const addData = () => {
    const visualInspectionDataCopy = element.visualInspectionImages ? [...element.visualInspectionImages] : [];
    visualInspectionDataCopy.push(['', '']);
    useTableStore.getState().updateElement(element.id!, { ...element, visualInspectionImages: visualInspectionDataCopy });
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
              {element.visualInspectionImages &&
                element.visualInspectionImages.map((data, i) => (
                  <VisualInspectionEntry data={data} updateData={(d) => updateData(i, d)} deleteData={() => deleteData(i)} />
                ))}
              <Button onClick={addData} style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center', width: 150 }}>
                <BiPlus size={20} /> add image
              </Button>
            </div>
          </div>
          {element.visualInspectionImages
            ? element.visualInspectionImages.map(([url, comment]) => {
                return (
                  <div style={{ position: 'relative' }}>
                    {url !== '' ? <img style={imageSyle} src={url}></img> : null}
                    <span style={contentStyle}>{comment}</span>
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
