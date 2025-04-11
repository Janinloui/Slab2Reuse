import { GenericUIRenderer } from '../generic/GenericUIRenderer';
import { useCollectionStore } from '../state/collectionStore';
import { getKeyCountMap } from '../types/allKeyMap';

export const BoilerPlateData: React.FC = () => {
  const data = useCollectionStore((s) => s.collections);

  return (
    <div>
      {JSON.stringify(data, null, 2)}
      {`dupplicate keys: ${getKeyCountMap()}`}
      <GenericUIRenderer item={data} label='Database' />
    </div>
  );
};
