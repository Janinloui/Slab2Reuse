import React from 'react';
import { Button, message, Upload } from 'antd';
import Papa from 'papaparse';
import { SlabType } from '../../types/componentType';
import { SlabKeyType } from '../../enums/componentKeyType';

const papaConfig: Papa.ParseConfig<unknown, undefined> & {
  download?: false | undefined;
  worker?: false | undefined;
} = {
  header: false,
};

export const UploadReboundTestCSV: React.FC<{ element: SlabType; setElement: (updateElement: SlabType) => void }> = ({ element, setElement }) => (
  <Upload
    accept='.csv'
    showUploadList={false}
    beforeUpload={(file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = Papa.parse(e.target!.result as any, papaConfig);

        console.log(result);

        try {
          const data = result.data as number[][];
          if (!Array.isArray(data) || !data.every((d) => Array.isArray(d))) throw new Error('not valid data');
          setElement({ ...element, [SlabKeyType.ReboundTestData]: data.map((v) => v.map((s) => Number(s))) });
        } catch (e) {
          message.error('importing the csv failed, check the console for more information');
          console.error(e);
        }
      };
      reader.readAsText(file);

      // Prevent upload
      return false;
    }}
  >
    <Button>upload data</Button>
  </Upload>
);
