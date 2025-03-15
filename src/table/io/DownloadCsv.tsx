import { Button } from 'antd';
import Papa from 'papaparse';
import { useTableStore } from '../../state/tableStore';

const DownloadCSV = () => {
  const handleDownload = () => {
    const csv = Papa.unparse(useTableStore.getState().elements);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const data = new Date();
    link.setAttribute(
      'download',
      `${data.getUTCFullYear().toString()}.${data.getMonth().toString().padStart(2, '0')}.${data.getDate().toString().padStart(2, '0')}-slab2reuse-data.csv`
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
