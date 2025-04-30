export enum Slab2ReuseRoutes {
  Landing = '/',
  ExampleData = '/table-only/example-data',
  RawTableView = '/raw-table-view/:collectionName',
  Viewer = '/viewer',
  TableOnly = '/table-only',
  ThreeOnly = '/three-only',
  BoilerPlate = '/boiler-plate',
  LabView = '/lab-view/:viewer',
  OnSiteView = '/on-site-view/:viewer',
  ArchiveView = '/archive-view/:viewer',
  MaterialPassport = '/material-passport/:componentId'
}

export const Slab2ReuseRouteLocal: Record<Slab2ReuseRoutes, string> = {
  [Slab2ReuseRoutes.Landing]: 'Home',
  [Slab2ReuseRoutes.ExampleData]: 'Example Data',
  [Slab2ReuseRoutes.RawTableView]: 'Objects View',
  [Slab2ReuseRoutes.Viewer]: 'Both',
  [Slab2ReuseRoutes.TableOnly]: 'Table Only',
  [Slab2ReuseRoutes.ThreeOnly]: '3D Only',
  [Slab2ReuseRoutes.BoilerPlate]: 'Boiler Plate Data',
  [Slab2ReuseRoutes.LabView]: 'Lab View',
  [Slab2ReuseRoutes.OnSiteView]: 'On Site View',
  [Slab2ReuseRoutes.ArchiveView]: 'Archive View',
  [Slab2ReuseRoutes.MaterialPassport]: 'Material Passport'
};
