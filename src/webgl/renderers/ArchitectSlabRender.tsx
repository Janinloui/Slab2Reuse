import React from 'react'; // Import React
import { Mesh } from 'three'; // Import Mesh from three.js
import { useTableStore } from '../../state/tableStore'; // Import the state management hook
import { SlabType } from '../../types/slabType'; // Import the SlabType type
import { getColorForCondition } from '../../lib/colors'; // Import the function to get colors based on condition
import { Text } from '@react-three/drei'; // Import the Text component for 3D labels


export const ArchitectSlabRenderer: React.FC = () => {
    const elements = useTableStore((s) => s.elements);
  
    // Filter out slabs with missing critical attributes
    const validElements = elements.filter(
      (slab) =>
        slab.typeOfElement && // Ensure typeOfElement is defined
        slab.dimensions_l && // Ensure dimensions_l is defined
        slab.dimensions_w && // Ensure dimensions_w is defined
        slab.dimensions_h // Ensure dimensions_h is defined
    );
  
    // Group slabs by derivative attribute "Type"
    const groupedSlabs = validElements.reduce((acc, slab) => {
      const type = `${slab.typeOfElement}_${slab.dimensions_l}_${slab.dimensions_w}_${slab.dimensions_h}`;
      if (!acc[type]) acc[type] = [];
      acc[type].push(slab);
      return acc;
    }, {} as Record<string, Partial<SlabType>[]>);
  
    return (
      <group>
        {Object.entries(groupedSlabs).map(([type, slabs], index) => {
          // Extract the typeOfElement and dimensions from the type string
          const [typeOfElement, dimensions_l, dimensions_w, dimensions_h] = type.split('_');
          const formattedLabel = `${typeOfElement} (${dimensions_l}, ${dimensions_w}, ${dimensions_h})`; // Format the label
  
          return (
            <group key={type} position={[index * 5000, 0, 0]}>
              {/* Add a label above each stack */}
              <Text
                position={[0, slabs.length * 300 + 500, 0]} // Position the label above the stack
                fontSize={400}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                {formattedLabel} {/* Display the formatted label */}
              </Text>
              {slabs.map((slab, i) => (
                <mesh
                  key={`${type}-${i}`}
                  position={[0, i * 300, 0]} // Stack slabs vertically
                  rotation={[0, 0, 0]}
                >
                  <boxGeometry args={[slab.dimensions_l || 1000, slab.dimensions_h || 200, slab.dimensions_w || 1000]} />
                  <meshStandardMaterial
                    color={
                      slab.condition
                        ? getColorForCondition(slab.condition)
                        : 'orange' // Default color if no condition is provided
                    }
                  />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>
    );
  };
  
  export default ArchitectSlabRenderer;