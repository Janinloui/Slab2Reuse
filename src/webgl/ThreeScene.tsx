import { Canvas, useThree } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import Slab from './renderers/Slab';
import { Bounds, OrbitControls, useBounds } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import ArchitectSlabRenderer from './renderers/ArchitectSlabRender'; // Import the new component
import { Mesh, Vector3 } from 'three';

const tolerance = 1e-6;
const upDefault = new Vector3(0, 0, 1);

const getUpVector = (normal: Vector3) => {
  // Any edge or corner
  if (Math.abs(Math.abs(normal.x + normal.y + normal.z) - 1) > tolerance) {
    return normal.clone().cross(upDefault).cross(normal).normalize();
  }
  if (Math.abs(normal.y + 1) < tolerance) {
    // Front
    return new Vector3(0, 0, 1);
  }
  if (Math.abs(normal.y - 1) < tolerance) {
    // Back
    return new Vector3(0, 0, -1);
  }

  // Top, Bottom, Left, Right
  return new Vector3(0, 1, 0);
};

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
const SelectToZoom: React.FC = () => {
  const api = useBounds();
  const selectedIds = useTableStore((s) => s.selectedElementIds);

  const { camera, invalidate, scene } = useThree();
  const controls = useThree((s) => s.controls as unknown as ControlsProto);

  useEffect(() => {
    console.log(selectedIds);

    if (controls) {
      if (selectedIds.length) {
        const centerVertices = selectedIds.map((id) => (scene.getObjectByName(id) as Mesh).position);
        const centerPoint = centerVertices.reduce((a, b) => a.add(b.multiplyScalar(1 / selectedIds.length)), new Vector3(0, 0, 0));
        const radius = Math.max(...centerVertices.map((v) => v.distanceTo(centerPoint)));

        console.log(radius);

        const normal = new Vector3(0, 1, 0);

        const target = controls.target.clone();
        const position = centerPoint.addScaledVector(normal, 5000);

        api?.refresh().moveTo(position).lookAt({ target, up: normal });

        invalidate();
      } else {
        const normal = new Vector3(0, 1, 0);

        const target = controls.target.clone();
        const position = target.clone().addScaledVector(normal, 5000);

        api
          ?.refresh()
          .moveTo(position)
          .lookAt({ target, up: new Vector3(0, 1, 0) });
      }
    }
  }, [selectedIds]);

  return <></>;
};

export const ThreeScene: React.FC = () => {
  const data = useTableStore((s) => s.elements);
  const userCategory = useTableStore((s) => s.userCategory); // Get the user category

  return (
    <Canvas>
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <directionalLight position={[10, 0, 0]} intensity={0.5} />
      <directionalLight position={[-10, 0, 0]} intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={Math.PI} />
      <directionalLight position={[-10, -10, -10]} intensity={1} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          {userCategory === 'Architect' ? (
            <ArchitectSlabRenderer /> // Render stacks for Architect view
          ) : (
            data.map((s, i) => <Slab key={`slab-${i}-${s.id}`} slab={s} />) // Default slab rendering
          )}
          <SelectToZoom />
        </Bounds>
      </Suspense>
      <OrbitControls makeDefault />
    </Canvas>
  );
};

//responsible for rendering a 3D scene
