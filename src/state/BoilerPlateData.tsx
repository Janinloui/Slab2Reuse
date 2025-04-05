import { getBoilerPlateDataForValyeType } from '../lib/getBoilerPlateData';
import { GenericUIRenderer } from '../generic/GenericUIRenderer';
import { DatabaseValueMap } from '../types/databseType';
import { ValueType } from '../types/valueType';

export const BoilerPlateData: React.FC = () => {
  const data = Object.fromEntries(Object.entries(DatabaseValueMap).map(([k, valueType]) => [k, getBoilerPlateDataForValyeType(valueType as ValueType)]));

  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <GenericUIRenderer item={data} isFirst />
    </div>
  );
};
