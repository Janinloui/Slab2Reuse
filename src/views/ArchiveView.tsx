// the archive view is where the table view is in focus

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ComponentTypeTable } from '../table/ComponentTypeTable';

export const ArchiveView = () => {
  const { viewer } = useParams();
  const [edit, setEdit] = useState(false);

  return (
    <div>
      <>placeholder header</>
      <ComponentTypeTable canChange={edit} height={window.innerHeight - 120} />
    </div>
  );
};
