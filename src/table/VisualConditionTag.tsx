import { Tag } from 'antd';
import { VisualCondition } from '../enums/visualCondition';
import { getColorForCondition } from '../lib/colors';

export const VisualConditionTag: React.FC<{ condition: VisualCondition }> = ({ condition }) => (
  <Tag bordered={false} color={getColorForCondition(condition)} style={{ color: 'black' }}>
    {condition}
  </Tag>
);
