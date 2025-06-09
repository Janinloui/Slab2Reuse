import { useRef, useState, useEffect } from 'react';
import { AxesHelper, BoxHelper } from 'three';
import { useTableStore } from '../../state/tableStore';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCollectionStore } from '../../state/collectionStore';
import { CollectionName } from '../../enums/collectionName';

// proportional to longest extent
const AXIS_LENGTH_SCALE = 0.1;
const AXIS_ORIGIN_OFFSET_SCALE = 0.05;

export const Axis: React.FC = () => {
  const data = useCollectionStore((s) => s.collections);
  const user = useTableStore((s) => s.viewer);
  const { scene } = useThree();

  const axesRef = useRef<AxesHelper>(null);
  const [axesSize, setAxesSize] = useState(500);
  const [axesPosition, setAxesPosition] = useState<[number, number, number]>([0, 0, 0]);
  useEffect(() => {
    if (data[CollectionName.Components].length > 0) {
      const boundingBoxHelper = new BoxHelper(scene.getObjectByName('slabGroup')!); // using building three helper method

      const minX = boundingBoxHelper.geometry.attributes.position.getX(2);
      const minY = boundingBoxHelper.geometry.attributes.position.getY(2);
      const minZ = boundingBoxHelper.geometry.attributes.position.getZ(2);

      const maxX = boundingBoxHelper.geometry.attributes.position.getX(4);
      const maxY = boundingBoxHelper.geometry.attributes.position.getY(4);
      const maxZ = boundingBoxHelper.geometry.attributes.position.getZ(4);

      // Calculate the maximum extent of the scene
      const maxExtent = Math.max(Math.abs(minX - maxX), Math.abs(minY - maxY), Math.abs(minZ - maxZ));

      // Set the axes size to be proportional to the maximum extent
      setAxesSize(maxExtent * AXIS_LENGTH_SCALE); // Scale factor for better visibility

      // Offset the axes slightly outside the bounding box
      setAxesPosition([
        minX - maxExtent * AXIS_ORIGIN_OFFSET_SCALE,
        minY - maxExtent * AXIS_ORIGIN_OFFSET_SCALE,
        maxZ - maxExtent * AXIS_ORIGIN_OFFSET_SCALE
      ]); // Offset in X and Z in three.js coordinates
    }
  }, [data, user]);

  return (
    <group position={axesPosition}>
      <axesHelper ref={axesRef} args={[axesSize]} />
      {/* <Text position={[axesSize, 0, 0]} fontSize={axesSize / 20} color='red'>
        X
      </Text>
      <Text position={[0, axesSize, 0]} fontSize={axesSize / 20} color='green'>
        Z
      </Text>
      <Text position={[0, 0, axesSize]} fontSize={axesSize / 20} color='blue'>
        Y
      </Text> */}
    </group>
  );
};
