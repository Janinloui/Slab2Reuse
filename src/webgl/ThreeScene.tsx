import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import { Bounds, OrbitControls, useBounds } from '@react-three/drei';
import React, { Suspense, useEffect, useMemo } from 'react';
// import { Axis } from './utils/Axis';
import { useCollectionStore } from '../state/collectionStore';
import { CollectionName } from '../enums/collectionName';
import { ComponentInstancesRenderer } from './renderers/ComponentInstancesRenderer';
import { ComponentKeyType } from '../enums/componentKeyType';
import { getEntry } from '../table/lib/componentDataMethod';
import { BuildingType } from '../types/buildingType';
import { getGeometryIdTypeComponentMap } from '../lib/getIdMapForTypes';

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
const SelectToZoom: React.FC<{ children: any }> = ({ children }) => {
  const api = useBounds();
  const selectedIds = useTableStore((s) => s.selectedElementIds);

  // useEffect(() => {
  //   if (selectedIds) {
  //     const slab = useTableStore.getState().elements.find((p) => selectedIds.includes(p.id!));
  //     if (slab) {
  //       const view = getViewForSlab(slab);
  //       view ? api.to(view) : api.fit();
  //     } else api.fit();
  //   }
  // }, [selectedIds]);

  return (
    <group
      onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())}
      onPointerMissed={(e: any) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
};

export const ThreeScene: React.FC = () => {
  const data = useCollectionStore((s) => s.collections);
  const userCategory = useTableStore((s) => s.viewer); // Get the user category

  const buildingId = useMemo(() => data[CollectionName.Components][0][ComponentKeyType.BuildingId], [data]); // ToDo fix logic to work with different buildings
  const componentMap = useMemo(() => getGeometryIdTypeComponentMap(data[CollectionName.Components]), [data]);

  return (
    <Canvas>
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <directionalLight position={[10, 0, 0]} intensity={0.5} />
      <directionalLight position={[-10, 0, 0]} intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={Math.PI} />
      <directionalLight position={[-10, -10, -10]} intensity={1} />
      <Suspense fallback={null}>
        <group name='slabGroup'>
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom>
              {
                Object.entries(componentMap).map(([geometryId, components]) => (
                  <ComponentInstancesRenderer
                    key={`slab-${geometryId}`}
                    geometryTypeId={geometryId}
                    components={components}
                    building={getEntry<BuildingType>(CollectionName.Buildings, buildingId)}
                  />
                )) // Default slab rendering
              }
            </SelectToZoom>
          </Bounds>
        </group>
      </Suspense>
      <OrbitControls makeDefault />
      {/* <Axis /> */}
    </Canvas>
  );
};
