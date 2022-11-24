import CollectionIntroductionComponent from '@components/collections/collection-introduction.component';
import ItemStatsComponent from '@components/items-stats/items-stats.components';
import CollectionItemsContainer from './collection-items.container';

const CollectionDetailsContainer = () => (
  <div>
    <div>
      <CollectionIntroductionComponent />
    </div>
    <div>
      <ItemStatsComponent />
    </div>
    <div className="mt-5">
      <CollectionItemsContainer />
    </div>
  </div>
);

export default CollectionDetailsContainer;
