import React, { ReactNode } from 'react';
import { message, Upload } from 'antd';
import Papa from 'papaparse';
import { CsvData, initNewProject, loadProject } from '../../lib/csv';
import { useTableStore } from '../../state/tableStore';
import { useNavigate } from 'react-router-dom';
import { Slab2ReuseRoutes } from '../../enums/routes';

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
          } catch (e) {
            message.error('importing the csv failed, check the console for more information');
            console.error(e);
          }
          navigate(Slab2ReuseRoutes.Viewer);
        };
        reader.readAsText(file);

        // Prevent upload
        return false;
      }}
    >
      {children}
    </Upload>
  );
};
