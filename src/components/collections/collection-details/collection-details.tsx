import CollectionIntroductionComponent from '@components/collections/collection-details/collection-introduction';
import { useState } from 'react';
import { BsListUl, BsListTask } from 'react-icons/bs';
import { MdOutlineAutoAwesomeMosaic, MdAutoAwesomeMosaic } from 'react-icons/md';
import useAppSelector from '@store/hooks/useAppSelector';
import { ItemsArea } from './items-area';
import { ItemStatsArea } from './items-stats-area';

const NotFound = () => (
  <div className="notListedLayout">
    <h2>This collection does not exist. Please try with another one</h2>
    <h5>Thank you!</h5>
  </div>
);

export const CollectionDetails = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const { selectedCollection } = useAppSelector((state) => state.marketplace);

  if (!Object.entries(selectedCollection).length) return <NotFound />;

  return (
    <div>
      <CollectionIntroductionComponent />
      <div className="container">
        <div className="d-flex">
          <span>
            <button
              className="change-display-btn display-icon"
              type="button"
              onClick={() => setIsStatsVisible(false)}
            >
              {!isStatsVisible ? <MdAutoAwesomeMosaic /> : <MdOutlineAutoAwesomeMosaic />}
            </button>
          </span>
          <span>
            <button
              className="change-display-btn display-icon"
              type="button"
              onClick={() => setIsStatsVisible(true)}
            >
              {!isStatsVisible ? <BsListTask /> : <BsListUl />}
            </button>
          </span>
        </div>
      </div>
      {isStatsVisible ? <ItemStatsArea /> : <ItemsArea />}
    </div>
  );
};
