import { Button } from 'antd';
import Papa from 'papaparse';
import { useTableStore } from '../../state/tableStore';
import { getCSVDataFromSlabTypes } from '../../lib/csv';

const DownloadCSV = () => {
  const handleDownload = () => {
    const csv = Papa.unparse(getCSVDataFromSlabTypes(useTableStore.getState().elements));
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const now = new Date();
    link.setAttribute(
      'download',
      `${now.getUTCFullYear().toString()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}-slab2reuse-data.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button type='primary' onClick={handleDownload}>
      Download CSV
    </Button>
  );
};

export default DownloadCSV;
