import { Tag } from 'antd';
import React from 'react';

/**
 * Component that renders a red tag with either a given `reason` or a default `missing` text.
 * @props reason - optional string 
 */
export const MissingData: React.FC<{ reason?: string }> = ({ reason }) => <Tag color='red'>{reason ?? 'missing'}</Tag>;
