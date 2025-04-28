import { Canvas } from '@react-three/fiber';
import { useTableStore } from '../state/tableStore';
import { Bounds, OrbitControls, useBounds } from '@react-three/drei';
import React, { Suspense, useMemo } from 'react';
import { useCollectionStore } from '../state/collectionStore';
import { CollectionName } from '../enums/collectionName';
import { ComponentInstancesRenderer } from './renderers/ComponentInstancesRenderer';
import { ComponentKeyType } from '../enums/componentKeyType';
import { NamedViews } from '../enums/viewer';
import { getPreprocessedGeometryDatatForComponents } from './utils/getGeometry';
import { Axis } from './utils/Axis';

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

  const geometryDisplayMap = useMemo(() => {
    const building = data[CollectionName.Buildings].find(
      (b) => b.id === data[CollectionName.Components][0][ComponentKeyType.BuildingId]
    );
    if (!building) return {};
    return getPreprocessedGeometryDatatForComponents(data[CollectionName.Components], building);
  }, [data]);

  const isAbstractPlanes = useMemo(
    () =>
      [NamedViews.ArchiveReusePotential, NamedViews.ArchiveProjectLevel, NamedViews.OnSiteTransport].includes(
        userCategory
      ),
    [userCategory]
  );

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
              {Object.entries(geometryDisplayMap).map(([geometryId, geometryDisplay]) => (
                <ComponentInstancesRenderer
                  key={`slab-${geometryId}`}
                  geometryTypeId={geometryId}
                  widthHeightLength={geometryDisplay.widthHeightLength}
                  planes={isAbstractPlanes ? geometryDisplay.abstractStackPlanes : geometryDisplay.realityPlanes}
                />
              ))}
            </SelectToZoom>
          </Bounds>
        </group>
      </Suspense>
      <OrbitControls makeDefault />
      <Axis />
    </Canvas>
  );
};
