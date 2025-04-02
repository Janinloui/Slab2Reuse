import React, { ReactNode, useState } from 'react';
import { Upload } from 'antd';
import Papa from 'papaparse';
import { CsvData, loadProject } from '../../lib/csv';
import { useTableStore } from '../../state/tableStore';
import { useNavigate } from 'react-router-dom';
import { Slab2ReuseRoutes } from '../../enums/routes';
import { TaggedError } from '../../types/taggedError';

const papaConfig: Papa.ParseConfig<unknown, undefined> & {
  download?: false | undefined;
  worker?: false | undefined;
} = {
  header: true,
};

type UploadCSVProps = {
  children: ReactNode;
};

export const UploadCSV: React.FC<UploadCSVProps> = ({ children }) => {
  const [text, setText] = useState<string | undefined>();
  const navigate = useNavigate();

  return (
    <Upload
      accept='.csv'
      showUploadList={false}
      beforeUpload={(file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = Papa.parse(e.target!.result as any, papaConfig);
          try {
            const elements = loadProject(result.data as CsvData);
            useTableStore.setState((s) => ({ elements }));
            navigate(Slab2ReuseRoutes.Viewer);
            setText(undefined);
          } catch (e) {
            setText(`${(e as TaggedError).keyedError ?? 'something went wrong when loading the csv'}${(e as TaggedError).tag ? (e as TaggedError).tag : ''}`);
            console.error(e);
          }
        };
        reader.readAsText(file);

        // Prevent upload
        return false;
      }}
    >
      {children}
      {text ? <span style={{ color: 'red' }}>{text}</span> : null}
    </Upload>
  );
};
