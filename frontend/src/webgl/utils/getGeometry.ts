import { ComponentKeyType } from '../../enums/componentKeyType';
import { getGeometryIdTypeComponentMap } from '../../lib/getIdMapForTypes';
import { getLocalCoordinates } from '../../lib/locationMapping';
import { getWidthHeightLenghtForGeometryId } from '../../table/lib/componentDataMethod';
import { BuildingType } from '../../types/buildingType';
import { ComponentType } from '../../types/componentType';
import { GeometryDisplayType } from '../../types/geometryDisplayType';
import { xyzToWebgl } from './coordinateSystem';

export const HORIZONTAL_SPACING = 500;
export const VERTICAL_SPACING = 100;

/**
 * Helper method to get the geometry information to render the components in the three js scene
 * @param components
 * @param building
 * @returns
 */
export const getPreprocessedGeometryDatatForComponents = (
  components: ComponentType[],
  building: BuildingType
): Record<string, GeometryDisplayType> => {
  const mappedByGeometryTypeId = getGeometryIdTypeComponentMap(components);

  // get the width height length object for each of the geometries

  const returnObject: Record<string, GeometryDisplayType> = {};
  let cumulativeLength = 0;

  Object.entries(mappedByGeometryTypeId).forEach(([geometryTypeId, components]) => {
    const widthHeightLength = getWidthHeightLenghtForGeometryId(geometryTypeId);
    if (!widthHeightLength) return;

    returnObject[geometryTypeId] = {
      widthHeightLength,
      realityPlanes: components.map((c) => ({
        position: xyzToWebgl(getLocalCoordinates(building, c[ComponentKeyType.Location])).map((v) => v * 1e3) as [
          number,
          number,
          number
        ],
        yaw: (c[ComponentKeyType.Yaw] * Math.PI) / 180
      })),
      abstractStackPlanes: components.map((c, i) => ({
        position: [
          cumulativeLength + widthHeightLength.length * 0.5,
          (widthHeightLength.height + VERTICAL_SPACING) * i,
          0
        ],
        yaw: 0
      }))
    };
    cumulativeLength += widthHeightLength.length + HORIZONTAL_SPACING;
  });

  return returnObject;
};
