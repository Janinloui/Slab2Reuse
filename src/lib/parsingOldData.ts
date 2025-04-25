import { VisualCondition } from '../enums/visualCondition';
import { BuildingType } from '../types/buildingType';
import { DatabaseType } from '../types/databaseType';
import { UserType } from '../types/userType';
import { ValueType } from '../types/valueType';
import { GeometryType } from '../types/geometryType';
import { CrossSectionType } from '../types/crossSectionType';
import { MaterialType } from '../types/materialType';
import { RebarType } from '../types/rebarType';
import { ComponentType } from '../types/componentType';
import { ComponentKeyType } from '../enums/componentKeyType';
import { BuildingKeyType } from '../enums/buildingKeyType';
import { getWGSCoordinates } from './locationMapping';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { ComponentCategory } from '../enums/componentCategory';
import { CrossSectionKeyType } from '../enums/crossSectionKeyType';
import { CrossSectionCategory } from '../enums/crossSectionCategory';
import { RebarKeyType } from '../enums/rebarKeyType';
import { RebarCategory } from '../enums/rebarCategory';
import { ReboundTestKeyType } from '../enums/reboundTestKeyType';
import { PreStressStrandKeyType } from '../enums/preStressStrandKeyType';
import { LocationKeyType } from '../enums/locationKeyType';

/**
 * Old SlabType data
 */
enum SlabKeyType {
  Id = 'id',
  PlanReference = 'planReference',
  Location_x = 'location_x',
  Location_y = 'location_y',
  Floor = 'floor',
  Strength = 'strength',
  Dimensions_l = 'dimensions_l',
  Dimensions_w = 'dimensions_w',
  Dimensions_h = 'dimensions_h',
  Liveload = 'liveload',
  TypeOfElement = 'typeOfElement',
  RebarDiameterTop = 'rebarDiameterTop',
  RebarAmountTop = 'rebarAmountTop',
  RebarDiameterBottom = 'rebarDiameterBottom',
  RebarAmountBottom = 'rebarAmountBottom',
  Condition = 'condition',
  ReboundTestData = 'reboundTestData',
  Yaw = 'rotZAxis_yaw',
  VisualInspectionImages = 'visualInspectionImages'
}

/**
 * Old SlabType data
 */
type SlabType = {
  [SlabKeyType.Id]: string;
  [SlabKeyType.PlanReference]: string;
  [SlabKeyType.Location_x]: number;
  [SlabKeyType.Location_y]: number;
  [SlabKeyType.Floor]: number;
  [SlabKeyType.Strength]: string;
  [SlabKeyType.Dimensions_l]: number;
  [SlabKeyType.Dimensions_w]: number;
  [SlabKeyType.Dimensions_h]: number;
  [SlabKeyType.Liveload]: number;
  [SlabKeyType.TypeOfElement]: string;
  [SlabKeyType.RebarDiameterTop]: number;
  [SlabKeyType.RebarAmountTop]: number;
  [SlabKeyType.RebarDiameterBottom]: number;
  [SlabKeyType.RebarAmountBottom]: number;
  [SlabKeyType.Condition]: VisualCondition;
  [SlabKeyType.ReboundTestData]: number[][];
  [SlabKeyType.Yaw]: number;
  [SlabKeyType.VisualInspectionImages]: [string, string][];
};

export const getMappedData = (oldData: SlabType[]): DatabaseType => {
  const theBuilding: BuildingType = {
    [BuildingKeyType.Id]: '0',
    [BuildingKeyType.Location]: {
      locationLongitude: 56.16906618295538,
      locationLatitude: 10.157261935492112,
      locationHeight: 10
    },
    [BuildingKeyType.Address]: 'Bispehavevej 85, 8210 Aarhus',
    [BuildingKeyType.OwnerId]: '',
    [BuildingKeyType.FormerUse]: '',
    [BuildingKeyType.GFA]: 0,
    [BuildingKeyType.Complexity]: 0,
    [BuildingKeyType.Img]: ''
  };

  const buildings: BuildingType[] = [theBuilding];
  const users: UserType[] = [];
  const components: ComponentType[] = [];
  const geometries: GeometryType[] = [];
  const crossSections: CrossSectionType[] = [];
  const materials: MaterialType[] = [];
  const rebars: RebarType[] = [];

  const geometriesMap: Record<string, GeometryType> = {};
  const crossSectionMap: Record<string, CrossSectionType> = {};
  const rebarMap: Record<string, RebarType> = {};

  oldData.forEach((data) => {
    const geometryTypeString = `${data[SlabKeyType.Dimensions_w]}x${data[SlabKeyType.Dimensions_l]}x${
      data[SlabKeyType.Dimensions_h]
    }`;

    if (!geometriesMap[geometryTypeString]) {
      const crossSectionTypeString = `${data[SlabKeyType.Dimensions_w]}x${data[SlabKeyType.Dimensions_h]}`;

      if (!crossSectionMap[crossSectionTypeString]) {
        const rebarTypeString = `${data[SlabKeyType.RebarAmountBottom]}x${data[SlabKeyType.RebarAmountTop]}x${
          data[SlabKeyType.RebarDiameterBottom]
        }x${data[SlabKeyType.RebarDiameterTop]}`;

        if (!rebarMap[rebarTypeString]) {
          const rebar: RebarType = {
            [RebarKeyType.Id]: Object.keys(rebarMap).length.toString(),
            [RebarKeyType.RebarCategory]: RebarCategory.Homogeneus,
            [RebarKeyType.RebarEntries]: [
              {
                [RebarKeyType.RebarDiameter]: data[SlabKeyType.RebarDiameterBottom],
                [RebarKeyType.RebarAmount]: data[SlabKeyType.RebarAmountBottom]
              }
            ],
            [RebarKeyType.RebarMaterialId]: ''
          };

          rebarMap[rebarTypeString] = rebar;
          rebars.push(rebar);
        }

        const crossSection: CrossSectionType = {
          [CrossSectionKeyType.Id]: Object.keys(crossSectionMap).length.toString(),
          [CrossSectionKeyType.CrossSectionCategory]: CrossSectionCategory.HollowCore,
          [CrossSectionKeyType.Width]: data[SlabKeyType.Dimensions_w],
          [CrossSectionKeyType.Height]: data[SlabKeyType.Dimensions_h],
          [CrossSectionKeyType.Moment]: 0,
          [CrossSectionKeyType.Shear]: 0,
          [CrossSectionKeyType.Normal]: 0,
          [CrossSectionKeyType.RebarTypeId]: rebarMap[rebarTypeString][RebarKeyType.Id],
          [CrossSectionKeyType.ConcreteMaterialTypeId]: '',
          [CrossSectionKeyType.PreStressStrandType]: {
            [PreStressStrandKeyType.PreStressForce]: 0,
            [PreStressStrandKeyType.PreStressSteelClass]: '',
            [PreStressStrandKeyType.PreStressSteelDiameter]: 0,
            [PreStressStrandKeyType.PreStressAmount]: 0,
            [PreStressStrandKeyType.Date]: '',
            [PreStressStrandKeyType.Location]: {
              [LocationKeyType.Longitude]: 0,
              [LocationKeyType.Latitude]: 0,
              [LocationKeyType.Height]: 0
            },
            [PreStressStrandKeyType.ManufacturerId]: ''
          }
        };

        crossSectionMap[crossSectionTypeString] = crossSection;
        crossSections.push(crossSection);
      }

      const geometry: GeometryType = {
        [GeometryKeyType.ComponentCategory]: ComponentCategory.Slab,
        [GeometryKeyType.Id]: Object.keys(geometriesMap).length.toString(),
        [GeometryKeyType.CrossSectionId]: crossSectionMap[crossSectionTypeString][CrossSectionKeyType.Id],
        [GeometryKeyType.Length]: data[SlabKeyType.Dimensions_l]
      };
      geometriesMap[geometryTypeString] = geometry;
      geometries.push(geometry);
    }

    const componentLocation = getWGSCoordinates(theBuilding, {
      x: data[SlabKeyType.Location_x] * 1e-3,
      y: data[SlabKeyType.Location_y] * 1e-3,
      z: theBuilding[BuildingKeyType.Location].locationHeight + data[SlabKeyType.Floor] * 3
    });

    // createing a new component
    const component: ComponentType = {
      [ComponentKeyType.Id]: data[SlabKeyType.Id],
      [ComponentKeyType.BuildingId]: theBuilding[BuildingKeyType.Id],
      [ComponentKeyType.Img]: '',
      [ComponentKeyType.ManufacturerId]: '',
      [ComponentKeyType.Condition]: VisualCondition.Good,
      [ComponentKeyType.NoHarmfulSubstance]: false,
      [ComponentKeyType.AvailableFrom]: '',
      [ComponentKeyType.Buyer]: '',
      [ComponentKeyType.Price]: 0,
      [ComponentKeyType.LoadingCondition]: '',
      [ComponentKeyType.PlanReference]: data[SlabKeyType.PlanReference],
      [ComponentKeyType.Yaw]: data[SlabKeyType.Yaw],
      [ComponentKeyType.GeometryTypeId]: geometriesMap[geometryTypeString][GeometryKeyType.Id],
      [ComponentKeyType.Floor]: data[SlabKeyType.Floor],
      [ComponentKeyType.Liveload]: data[SlabKeyType.Liveload],
      [ComponentKeyType.Location]: componentLocation,
      [ComponentKeyType.VisualInspection]: [],
      [ComponentKeyType.ReboundTest]:
        data[SlabKeyType.ReboundTestData] && data[SlabKeyType.ReboundTestData].length
          ? data[SlabKeyType.ReboundTestData].map((reboundTestData) => ({
              [ReboundTestKeyType.ReboundValue]: reboundTestData,
              [ReboundTestKeyType.ReboundDate]: '',
              [ReboundTestKeyType.UserId]: '',
              [ReboundTestKeyType.Location]: componentLocation
            }))
          : undefined
    };
    components.push(component);
  });

  return { buildings, users, components, geometries, crossSections, materials, rebars };
};
