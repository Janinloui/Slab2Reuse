import { Button } from 'antd';
import Papa from 'papaparse';
import { SlabType } from '../../types/slabType';
import { SlabKeyType } from '../../enums/attributeNames';
import { getType } from '../attributeDefinition';

export const DownloadReboundTestCSV: React.FC<{ element: SlabType }> = ({ element }) => {
  const handleDownload = () => {
    const csv = Papa.unparse(element[SlabKeyType.ReboundTestData]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const now = new Date();
    link.setAttribute(
      'download',
      `${now.getUTCFullYear().toString()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now
        .getDate()
        .toString()
        .padStart(2, '0')}-slab2reuse-data-reboundTest-${getType(element) ?? element.id!}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button disabled={!Boolean(element[SlabKeyType.ReboundTestData] && element[SlabKeyType.ReboundTestData].length)} type='primary' onClick={handleDownload}>
      Download CSV
    </Button>
  );
};

export default DownloadReboundTestCSV;
