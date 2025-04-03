import { getBoilerPlateDataForValyeType } from "../../data/getBoilerPlateData";
import { DatabaseValueMap } from "../types/databseType";
import { ValueType } from "../types/valueType";

export const BoilerPlateData: React.FC = () => {
  return (
    <div>
      {
        JSON.stringify(Object.fromEntries(Object.entries(DatabaseValueMap).map(([k, valueType]) => [k, getBoilerPlateDataForValyeType(valueType as ValueType)])), null, 2)
      }
    </div>
  );
}