import { MultiTestKeys, MultiTestKeysType, SelectedPreStressStrandKeys } from '../types/dataOfTestsForGeometryType';
import { ChemicalTestKeyType } from './chemicalTestKeyType';
import { ComponentDerivedAttributes } from './componentDerivedAttributes';
import { ComponentKeyType } from './componentKeyType';
import { CoreTestKeyType } from './coreTestKeyType';
import { DestructiveTestKeyType } from './destructiveTestKeyType';
import { GPRTestKeyType } from './gprTestKeyType';
import { MaterialKeyType } from './materialKeyType';
import { PreStressStrandKeyType } from './preStressStrandKeyType';
import { ReboundTestKeyType } from './reboundTestKeyType';

/**
 * Enum which shows all the views for which unqiue key combinations should be displayed
 */
export enum NamedViews {
  ArchiveProjectLevel = 'archive-project-level', // this one is not relvant for the components!
  ArchiveElementLevelGeometry = 'archive-element-geometry',
  ArchiveElementMaterial = 'archive-element-material',
  ArchiveElementCapacity = 'archive-element-capacity',
  ArchiveReusePotential = 'archive-reuse-potential',
  OnSiteTransport = 'on-site-transport',
  OnSiteVisualInspection = 'on-site-visual-inspection',
  OnSiteReboundTesting = 'on-site-rebound-testing',
  OnSiteReinforcementScreening = 'on-site-reinforcement-screening',
  OnSiteDeconstruction = 'on-site-deconstruction',
  LabCoreTesting = 'lab-core-testing',
  LabFullScaleTest = 'lab-full-scale-test'
}

export const NamedViewsLocal: Record<NamedViews, string> = {
  [NamedViews.ArchiveProjectLevel]: 'Project View',
  [NamedViews.ArchiveElementLevelGeometry]: 'Component Geometry',
  [NamedViews.ArchiveElementMaterial]: 'Material Properties',
  [NamedViews.ArchiveElementCapacity]: 'Capacity',
  [NamedViews.ArchiveReusePotential]: 'Reuse Potential',
  [NamedViews.OnSiteTransport]: 'Transport',
  [NamedViews.OnSiteVisualInspection]: 'Visual Inspection',
  [NamedViews.OnSiteReboundTesting]: 'Rebound Testing',
  [NamedViews.OnSiteReinforcementScreening]: 'Reinforcement Screening',
  [NamedViews.OnSiteDeconstruction]: 'Deconstruction',
  [NamedViews.LabCoreTesting]: 'Core Testing',
  [NamedViews.LabFullScaleTest]: 'Full Scale Test'
};

export const AllKeysWithColumnDefined = [
  ...Object.values(ComponentDerivedAttributes),
  ...Object.values(ComponentKeyType),
  ...MultiTestKeys,
  ...Object.values(MaterialKeyType),
  ...SelectedPreStressStrandKeys
];

export const DefaultViewerColumnMap: Record<
  NamedViews,
  (
    | ComponentDerivedAttributes
    | ComponentKeyType
    | MultiTestKeysType
    | MaterialKeyType
    | (typeof SelectedPreStressStrandKeys)[number]
  )[]
> = {
  [NamedViews.ArchiveProjectLevel]: [],
  [NamedViews.ArchiveElementLevelGeometry]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.PlanReference,
    ComponentKeyType.Floor,
    ComponentKeyType.Location,
    ComponentKeyType.ManufacturerId,
    ComponentDerivedAttributes.Width,
    ComponentDerivedAttributes.Height,
    ComponentDerivedAttributes.Length,
    ComponentDerivedAttributes.LocationInRelationToBuilding
  ],
  [NamedViews.ArchiveElementMaterial]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.PlanReference,
    ComponentKeyType.Floor,
    PreStressStrandKeyType.PreStressSteelClass,
    MaterialKeyType.CompressiveStrength,
    MaterialKeyType.TensileStrength,
    MaterialKeyType.ElasticModulus,
    MaterialKeyType.Density,
    MaterialKeyType.ExposureClass
  ],
  [NamedViews.ArchiveElementCapacity]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.PlanReference,
    ComponentKeyType.Floor,
    DestructiveTestKeyType.MomentCapacity,
    DestructiveTestKeyType.ShearCapacity,
    DestructiveTestKeyType.NormalCapacity
  ],
  [NamedViews.ArchiveReusePotential]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.PlanReference,
    ComponentKeyType.ManufacturerId,
    ComponentDerivedAttributes.Width,
    ComponentDerivedAttributes.Height,
    ComponentDerivedAttributes.Length
  ],
  [NamedViews.OnSiteTransport]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.GeometryTypeId,
    ComponentKeyType.Condition
  ],
  [NamedViews.OnSiteVisualInspection]: [
    ComponentKeyType.Id,
    ComponentKeyType.Condition,
    ComponentKeyType.NoHarmfulSubstance,
    ComponentKeyType.PlanReference,
    ComponentKeyType.Floor,
    ComponentKeyType.VisualInspection,
    ComponentKeyType.GeometryTypeId
  ],
  [NamedViews.OnSiteReboundTesting]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.PlanReference,
    ComponentKeyType.Floor,
    ComponentKeyType.VisualInspection,
    ComponentKeyType.ReboundTest,
    ReboundTestKeyType.ReboundValue
  ],
  [NamedViews.OnSiteReinforcementScreening]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.PlanReference,
    ComponentKeyType.Floor,
    ComponentKeyType.GeometryTypeId,
    GPRTestKeyType.RebarAmount,
    GPRTestKeyType.CoverDepth,
    GPRTestKeyType.RebarDiameter,
    PreStressStrandKeyType.PreStressSteelClass
  ],
  [NamedViews.OnSiteDeconstruction]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.PlanReference,
    ComponentKeyType.Floor,
    ComponentKeyType.Buyer
  ],
  [NamedViews.LabCoreTesting]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.GeometryTypeId,
    CoreTestKeyType.CoreCompressiveStrength,
    CoreTestKeyType.CoreDiameter,
    ChemicalTestKeyType.ChlorideContent,
    ChemicalTestKeyType.AlkaliReactivity,
    ChemicalTestKeyType.CarbonationDepth
  ],
  [NamedViews.LabFullScaleTest]: [
    ComponentDerivedAttributes.ComponentType,
    ComponentKeyType.Id,
    ComponentKeyType.GeometryTypeId,
    DestructiveTestKeyType.ShearStrength,
    DestructiveTestKeyType.CompressiveStrength,
    DestructiveTestKeyType.TensileStrength,
    DestructiveTestKeyType.YoungsModulus,
    DestructiveTestKeyType.MomentCapacity,
    DestructiveTestKeyType.ShearCapacity,
    DestructiveTestKeyType.NormalCapacity,
    DestructiveTestKeyType.Density
  ]
};
