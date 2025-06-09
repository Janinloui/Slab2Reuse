import { Instance, Instances } from '@react-three/drei';

export const ComponentInstancesRenderer: React.FC<{
  geometryTypeId: string;
  widthHeightLength: { width: number; height: number; length: number };
  planes: {
    position: [number, number, number];
    yaw: number;
    color?: [number, number, number];
  }[];
}> = ({ widthHeightLength, planes }) => (
  <Instances>
    <boxGeometry args={[widthHeightLength.length, widthHeightLength.height, widthHeightLength.width]} />
    <meshStandardMaterial />
    {planes.map((plane, i) => (
      <Instance key={i} position={plane.position} rotation={[0, plane.yaw, 0]} color={plane.color} />
    ))}
  </Instances>
);
