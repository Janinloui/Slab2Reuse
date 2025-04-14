import { ComponentKeyType } from '../../enums/componentKeyType';
import { getLocalCoordinates } from '../../lib/locationMapping';
import { getWidthHeightLenghtForGeometryId } from '../../table/lib/componentDataMethod';
import { BuildingType } from '../../types/buildingType';
import { ComponentType } from '../../types/componentType';
import { Instance, Instances } from '@react-three/drei';
import { xyzToWebgl } from '../utils/coordinateSystem';

export const ComponentInstancesRenderer: React.FC<{
  geometryTypeId: string;
  components: ComponentType[];
  building: BuildingType | undefined;
}> = ({ geometryTypeId, components, building }) => {
  if (!building) return null;
  const widthHeightLength = getWidthHeightLenghtForGeometryId(geometryTypeId);

  if (!widthHeightLength) return null;

  return (
    <Instances>
      <boxGeometry args={[widthHeightLength.length, widthHeightLength.height, widthHeightLength.width]} />
      <meshNormalMaterial />
      {components.map((component) => (
        <Instance
          position={
            xyzToWebgl(getLocalCoordinates(building, component[ComponentKeyType.Location])).map((v) => v * 1e3) as [
              number,
              number,
              number
            ]
          }
          rotation={[0, (component[ComponentKeyType.Yaw] * Math.PI) / 180, 0]}
        />
      ))}
    </Instances>
  );
};
