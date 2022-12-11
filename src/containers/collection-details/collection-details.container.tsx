import CollectionIntroductionComponent from '@components/collections/collection-introduction.component';
import ItemStatsComponent from '@components/items-stats/items-stats.components';
import { useState } from 'react';
import { BsListUl, BsListTask } from 'react-icons/bs';
import { MdOutlineAutoAwesomeMosaic, MdAutoAwesomeMosaic } from 'react-icons/md';
import CollectionItemsContainer from './collection-items.container';

const CollectionDetailsContainer = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  return (
    <div>
      <div>
        <CollectionIntroductionComponent />
      </div>
      <div className="container">
        <div className="d-flex">
          <span>
            <button
              className="change-display-btn"
              type="button"
              onClick={() => setIsStatsVisible(false)}
            >
              {!isStatsVisible ? (
                <MdAutoAwesomeMosaic className="display-icon" />
              ) : (
                <MdOutlineAutoAwesomeMosaic className="display-icon" />
              )}
            </button>
          </span>
          <span>
            <button
              className="change-display-btn"
              type="button"
              onClick={() => setIsStatsVisible(true)}
            >
              {!isStatsVisible ? (
                <BsListTask className="display-icon" />
              ) : (
                <BsListUl className="display-icon" />
              )}
            </button>
          </span>
        </div>
      </div>
      {isStatsVisible ? (
        <div>
          <ItemStatsComponent />
        </div>
      ) : (
        <div className="mt-5">
          <CollectionItemsContainer />
        </div>
      )}
    </div>
  );
};

export default CollectionDetailsContainer;
