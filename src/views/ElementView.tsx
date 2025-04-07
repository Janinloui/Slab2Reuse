import { Drawer } from 'antd';
import { EditorType } from '../types/editorType';
import { SlabType } from '../types/slabType';
import { getType } from '../table/attributeDefinition';

type ElementViewProps = {
  editorType: EditorType;
  element: SlabType | null;
  close: (() => void) | null;
};

export const ElementView: React.FC<ElementViewProps> = ({ editorType, element, close }) => {
  switch (editorType) {
    case 'drawer':
      return (
        <Drawer open={!!element} onClose={close ?? undefined} width={400}>
          <h2>Drawer View</h2>
          {element && <p>{getType(element)}</p>}
          {close && <button onClick={close}>Close</button>}
        </Drawer>
      );
    case 'div':
      return element ? (
        <div style={{width: 450 }}>
          <h2>Div View</h2>
          {element && <p>{getType(element)}</p>}
          {close && <button onClick={close}>Close</button>}
        </div>
      ) : <div style={{width: 0 }}/>;
    default:
      return null;
  }
};
