import { useRef } from 'react';
import Papa from 'papaparse';
import { CsvData, initNewProject } from '../../lib/csv';

const papaConfig: Papa.ParseConfig<unknown, undefined> & {
  download?: false | undefined;
  worker?: false | undefined;
} = {
  header: true,
};

export const CsvUpload: React.FC = () => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (!selectedFileRef.current) return;
    selectedFileRef.current.click();
  };

  const parseFile = () => {
    const files = (document.getElementById('selectFiles') as any).files;
    if (files.length <= 0) {
      return false;
    }

    const fr = new FileReader();

    fr.onload = (e) => {
      const result = Papa.parse(e.target!.result as any, papaConfig);
      const slabData = initNewProject(result.data as CsvData);
      console.log(slabData);
    };

    fr.readAsText(files.item(0));
  };

  return (
    <>
      <input ref={selectedFileRef} type='file' id='selectFiles' onChange={parseFile} multiple />
      <button id='import' onClick={handleUpload} style={{ position: 'absolute', left: 10, top: 10, padding: '2px 8px', color: 'white' }}>
        upload
      </button>
    </>
  );
};
