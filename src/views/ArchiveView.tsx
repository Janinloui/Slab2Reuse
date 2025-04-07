// the archive view is where the table view is in focus

import { useParams } from 'react-router-dom';
import { SlabTable } from '../table/SlabTable';
import { useState } from 'react';

export const ArchiveView = () => {
  const { viewer } = useParams();
  const [edit, setEdit] = useState(false);

  return (
    <div>
      <>placeholder header</>
      <SlabTable />
      <Modal></Modal>
    </div>
  );
};
