import { useRef, useState, useEffect } from 'react';
import { AxesHelper, BoxHelper } from 'three';
import { getZForSlab } from '../../lib/3d';
import { useTableStore } from '../../state/tableStore';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export const Axis: React.FC = () => {
  const elements = useTableStore((s) => s.elements);
  const user = useTableStore((s) => s.userCategory);
  const { scene } = useThree();

  const axesRef = useRef<AxesHelper>(null);
  const [axesSize, setAxesSize] = useState(500);
  const [axesPosition, setAxesPosition] = useState<[number, number, number]>([0, 0, 0]);
  useEffect(() => {
    if (elements.length > 0) {
      const boundingBoxHelper = new BoxHelper(scene);

      const v3min = boundingBoxHelper.geometry.boundingBox?.min!;
      const v3max = boundingBoxHelper.geometry.boundingBox?.max!;

      if (!v3min || !v3max) return;

      // Calculate the maximum extent of the scene
      const maxExtent = Math.max(Math.abs(v3min.x - v3max.x), Math.abs(v3min.y - v3max.y), Math.abs(v3min.z - v3max.z));

      // Set the axes size to be proportional to the maximum extent
      setAxesSize(maxExtent * 0.1); // Scale factor for better visibility

      // Offset the axes slightly outside the bounding box
      setAxesPosition([v3min.x - maxExtent * 0.05, v3min.y, v3min.z - maxExtent * 0.05]); // Offset in X and Z in three.js coordinates
    }
  }, [elements, user]);

  return (
    <group position={axesPosition}>
      <axesHelper ref={axesRef} args={[axesSize]} />
      <Text position={[axesSize, 0, 0]} fontSize={axesSize / 20} color='red'>
        X
      </Text>
      <Text position={[0, axesSize, 0]} fontSize={axesSize / 20} color='green'>
        Z
      </Text>
      <Text position={[0, 0, axesSize]} fontSize={axesSize / 20} color='blue'>
        Y
      </Text>
    </group>
  );
};
