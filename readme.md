# Slab 2 Reuse

### Data Model

<ins>types</ins>

- BuildingType
- LocationType
- UserType
- ComponentType
- GeometryType
- CrossSectionType
- MaterialType
- RebarType
- PreStressStrandType
- ReboundTestType
- ChemicalTestType
- DestructionTestType
- CoreTestType
- GPRTestType
- VisualInspectionType

<ins>ComponentType</ins>
```javascript
{
  buildingType: BuildingType,
  locationType: LocationType,
  manufacturer: UserType,
  geometryType: GeometryType: {
    crossSectionType: {
      materialType: MaterialType,
      rebarType: RebarType,
      preStressStrandType: PreStressStrandType
    },
  },
  visualInspection: VisualInspectionType[],
  destructionTestType: DestructionTestType, // % of the slabs of a type will be tested, derivative value should be displayed (+ actual if sepcific component was tested)
  coreTestType: CoreTestType, // x% of the slabs will be tested, derivative value should be displayed (+ actual if sepcific component was tested)
  chemicalTestType: ChemicalTestType, // x% of the slabs will be tested, derivative value should be displayed (+ actual if sepcific component was tested)
  gPRTestType: GPRTestType, // xx% of the slabs will be tested, derivative value should be displayed (+ actual if sepcific component was tested)
  reboundTestType: ReboundTestType, // xx% of the slabs will be tested, derivative value should be displayed (+ actual if sepcific component was tested)
}
```

<ins>documents</ins>
```javascript
{
  "buildings": BuildingType[],
  "users": UserType[],
  "components": ComponentType[],
  "geometries": GeometryType[],
  "crossSections": CrossSectionType[],
  "materials": MaterialType[],
  "rebars": RebarConfigurationType[],
}
```