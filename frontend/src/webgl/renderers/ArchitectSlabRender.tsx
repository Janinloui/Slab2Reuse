import React from 'react'; // Import React
import { useTableStore } from '../../state/tableStore'; // Import the state management hook
import { SlabType } from '../../types/componentType'; // Import the SlabType type
import { Text } from '@react-three/drei'; // Import the Text component for 3D labels
import Slab from './Slab';
import { getType } from '../../table/attributeDefinition';

const slabSpacingVertical = 300;
const slabSpacingHorizontal = 5000;

export const ArchitectSlabRenderer: React.FC = () => {
  const elements = useTableStore((s) => s.elements);

  // Group slabs by derivative attribute "Type"
  const groupedSlabs = elements.reduce((acc, slab) => {
    const type = getType(slab);
    if (!type) return acc;
    if (!acc[type]) acc[type] = [];
    acc[type].push(slab);
    return acc;
  }, {} as Record<string, Partial<SlabType>[]>);

  return (
    <group>
      {Object.entries(groupedSlabs).map(([type, slabs], index) => {
        // Extract the typeOfElement and dimensions from the type string
        return (
          <group key={type} position={[index * slabSpacingHorizontal, 0, 0]}>
            {/* Add a label above each stack */}
            <Text
              position={[0, slabs.length * slabSpacingVertical + 500, 0]} // Position the label above the stack
              fontSize={400}
              color='black'
              anchorX='center'
              anchorY='middle'
            >
              {type} {/* Display the formatted label */}
            </Text>
            {slabs.map((slab, i) => (
              <Slab key={i} slab={slab} positionOverride={[0, i * slabSpacingVertical, 0]} rotationOverride={[0, 0, 0]} />
            ))}
          </group>
        );
      })}
    </group>
  );
};

export default ArchitectSlabRenderer;
