import { GenericUIRenderer } from '../generic/GenericUIRenderer';
import { useCollectionStore } from '../state/collectionStore';

export const BoilerPlateData: React.FC = () => {
  const data = useCollectionStore((s) => s.collections);

  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <GenericUIRenderer item={data} isFirst />
    </div>
  );
};
