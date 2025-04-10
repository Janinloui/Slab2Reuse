import { ComponentType } from 'react';
import { BuildingType } from './buildingType';
import { CrossSectionType } from './crossSectionType';
import { GeometryType } from './geometryType';
import { MaterialType } from './materialType';
import { RebarType } from './rebarType';
import { UserType } from './userType';

export type DatabaseObjectType =
  | BuildingType
  | UserType
  | ComponentType
  | GeometryType
  | CrossSectionType
  | MaterialType
  | RebarType;

export type DatabaseObjectValue =
  | 'BuildingType'
  | 'UserType'
  | 'ComponentType'
  | 'GeometryType'
  | 'CrossSectionType'
  | 'MaterialType'
  | 'RebarType';
