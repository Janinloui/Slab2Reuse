import { BuildingKeyType } from '../enums/buildingKeyType';
import { LocationKeyType } from '../enums/locationKeyType';
import { BuildingType } from '../types/buildingType';
import { LocationType } from '../types/locationType';
import { Vector3Type } from '../types/vector3';

// all location in the project are stored in WGS84 coordinates
// hower, when drawing on a map we will be interating with its local coordinate system

const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
const toDegrees = (radians: number): number => radians * (180 / Math.PI);

const wgs84ToLocalXY = (latRef: number, lonRef: number, lat: number, lon: number): { x: number; y: number } => {
  const earthRadius = 6378137; // Earth radius in meters (WGS 84)

  // Convert degrees to radians

  const latRefRad = toRadians(latRef);
  const lonRefRad = toRadians(lonRef);
  const latRad = toRadians(lat);
  const lonRad = toRadians(lon);

  // Calculate differences
  const dLat = latRad - latRefRad;
  const dLon = lonRad - lonRefRad;

  // Project to a flat plane (simple equirectangular approximation)
  const x = earthRadius * dLon * Math.cos(latRefRad); // Adjust for latitude scale
  const y = earthRadius * dLat;

  return { x, y };
};

/**
 * Method that takes a WGS coordinate and returns in local coordinates based on the building location
 * @param building - BuildingType
 * @param location - LocationType
 */
export const getLocalCoordinates = (building: BuildingType, location: LocationType): Vector3Type => ({
  ...wgs84ToLocalXY(
    building[BuildingKeyType.Location][LocationKeyType.Latitude],
    building[BuildingKeyType.Location][LocationKeyType.Longitude],
    location[LocationKeyType.Latitude],
    location[LocationKeyType.Longitude]
  ),
  z: location[LocationKeyType.Height]
});

const localXYToWGS84 = (
  latRef: number,
  lonRef: number,
  x: number,
  y: number
): { [LocationKeyType.Latitude]: number; [LocationKeyType.Longitude]: number } => {
  const earthRadius = 6378137; // Earth radius in meters (WGS 84)

  // Convert degrees to radians and vice versa

  const latRefRad = toRadians(latRef);
  const lonRefRad = toRadians(lonRef);

  // Convert X, Y back to latitude and longitude
  const dLat = y / earthRadius; // Change in latitude
  const dLon = x / (earthRadius * Math.cos(latRefRad)); // Change in longitude

  const lat = toDegrees(latRefRad + dLat); // Final latitude
  const lon = toDegrees(lonRefRad + dLon); // Final longitude

  return { [LocationKeyType.Longitude]: lon, [LocationKeyType.Latitude]: lat };
};

/**
 * Method that takes a WGS coordinate and returns in local coordinates based on the building location
 * @param building - BuildingType
 * @param location - LocationType
 */
export const getWGSCoordinates = (building: BuildingType, localPosition: Vector3Type): LocationType => ({
  ...localXYToWGS84(
    building[BuildingKeyType.Location][LocationKeyType.Latitude],
    building[BuildingKeyType.Location][LocationKeyType.Longitude],
    localPosition.x,
    localPosition.y
  ),
  [LocationKeyType.Height]: localPosition.z
});
