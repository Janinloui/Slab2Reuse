# Slab 2 Reuse

Code used by Circrete for enabling ourself and you! to streamline the re-use of structural concrete elements. 

## Circrete

Circrete is a Copenhagen based Start-Up focusing on trying to re-use and certify concrete slabs for reuse in a structural capacity!

## Slab 2 Reuse

A follow up on a POC build for the BloxHub AEC hackathon of 2025, Slab 2 Reuse is the ERP tool we're developing for Circretes workflow. Starting very course, estimating the dimensions of slabs from a plan, through various test stages to in the end a web interface where costumers can check parts availability and download datasheets and ifc files to integrate in their design planning and workflow. 

## Current state

Either clone this repository and run it locally using `bun` (though `npm` or `yarn` should also work) or check out the latest version on [Github Pages](https://janinloui.github.io/Slab2Reuse/)

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
  "rebars": RebarType[],
}
```