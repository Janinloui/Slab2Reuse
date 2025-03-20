import { Tag } from 'antd';
import { VisualCondition } from '../enums/visualCondition';
import { getColorForCondition } from '../lib/colors';

export const VisualConditionTag: React.FC<{ condition: VisualCondition }> = ({ condition }) => (
  <Tag
    style={{
      backgroundColor: getColorForCondition(condition),
      width: '100px', // Fixed width
    }}
  >
    {condition}
  </Tag>
);
