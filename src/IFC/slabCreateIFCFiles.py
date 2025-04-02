import json
import ifcopenshell
import ifcopenshell.api

# Function to create a new IFC file for a component
def create_ifc_file(component):
    # Create a new IFC file
    new_ifc = ifcopenshell.file(schema="IFC4")

    # Add project information
    project = ifcopenshell.api.run("root.create_entity", new_ifc, ifc_class="IfcProject", name="Component Project")
    ifcopenshell.api.run("unit.assign_unit", new_ifc, length="METRE")

    # Add a slab (or component)
    slab = ifcopenshell.api.run("root.create_entity", new_ifc, ifc_class="IfcSlab", name=component["Name"])
    slab.GlobalId = component["GlobalId"]

    # Add property set
    pset = ifcopenshell.api.run("pset.add_pset", new_ifc, product=slab, name="Pset_ComponentAttributes")
    ifcopenshell.api.run("pset.edit_pset", new_ifc, pset=pset, properties={
        "RebarAmount": component["RebarAmount"],
        "RebarDiameter": component["RebarDiameter"],
        "Material": component["Material"],
        "PlanReference": component["PlanReference"]
    })

    # Add rebound test data as a property set
    rebound_pset = ifcopenshell.api.run("pset.add_pset", new_ifc, product=slab, name="Pset_ReboundTestData")
    rebound_data = component.get("ReboundTestData", [])
    ifcopenshell.api.run("pset.edit_pset", new_ifc, pset=rebound_pset, properties={
        "ReboundTestData": rebound_data
    })

    # Save the new IFC file
    new_ifc.write(f"{component['GlobalId']}.ifc")

# Load components dynamically from a JSON file
with open("components.json", "r") as json_file:
    data = json.load(json_file)

components = data["components"]

# Create IFC files for each component in the "Slab" category
for component in components:
    if component["ComponentCategory"] == "Slab":  # Check category
        create_ifc_file(component)