import ItemStatsComponent from '@components/items-stats/items-stats.components';
import CollectionItemsContainer from './collection-items.container';

const CollectionDetailsContainer = () => (
  <div className="container">
    <div>
      <ItemStatsComponent />
    </div>
    <div className="mt-5">
      <CollectionItemsContainer />
    </div>
  </div>
);

export default CollectionDetailsContainer;
