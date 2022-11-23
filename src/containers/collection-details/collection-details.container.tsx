import ItemSliderComponent from '@components/item-slider/item-slider.component';
import ItemStatsComponent from '@components/items-stats/items-stats.components';

const CollectionDetailsContainer = () => (
  <div className="container">
    <div>
      <ItemStatsComponent />
    </div>
    <div className="mt-5">
      <ItemSliderComponent />
    </div>
  </div>
);

export default CollectionDetailsContainer;
