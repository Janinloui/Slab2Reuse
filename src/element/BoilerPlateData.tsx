import { GenericUIRenderer } from '../generic/GenericUIRenderer';
import { useCollectionStore } from '../state/collectionStore';
import { getKeyCountMap } from '../types/allKeyMap';

export const BoilerPlateData: React.FC = () => {
  const data = useCollectionStore((s) => s.collections);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span>{JSON.stringify(data, null, 2)}</span>
      <span>{`dupplicate keys: ${getKeyCountMap()}`}</span>
      <GenericUIRenderer item={data} label='Database' />
    </div>
  );
};
