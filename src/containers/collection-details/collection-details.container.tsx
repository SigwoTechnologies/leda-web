import ItemSliderComponent from '@components/item-slider/item-slider.component';
import ItemStatsComponent from '@components/items-stats/items-stats.components';

const CollectionDetailsContainer = () => (
  <div className="container">
    <ItemStatsComponent />
    <ItemSliderComponent />
  </div>
);

export default CollectionDetailsContainer;
