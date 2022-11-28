import NiceSelect from '@ui/nice-select';
import clsx from 'clsx';
import { useState } from 'react';
import { selectCollectionsState } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

const CollectionsFilter = () => {
  const { collections } = useAppSelector(selectCollectionsState);
  const [isOpen, setIsOpen] = useState(false);
  const handleTriggerButton = () => setIsOpen((prev) => !prev);

  const options = collections.map((collection) => ({
    value: collection.name.split(' ').join('-').toLocaleLowerCase(),
    text: `${collection.name === 'LedaNFT' ? 'Default Collection' : collection.name} (${
      collection.items.length
    }) `,
    direction: 'asc',
  }));

  return (
    <div>
      <div className="view-more-btn text-start text-sm-end">
        <button
          type="button"
          className={clsx(
            'discover-filter-button discover-filter-activation btn btn-primary',
            isOpen && 'open'
          )}
          onClick={handleTriggerButton}
        >
          Filter
          <i className="feather-filter" />
        </button>
      </div>

      {isOpen && (
        <div className="default-exp-wrapper default-exp-expand">
          <div className="inner row" style={{ width: 'auto' }}>
            <div className="filter-select-option col-3">
              <h6 className="filter-leble">Search</h6>
              <input className="nice-select text-white" placeholder="Search by title" />
            </div>

            <div className="filter-select-option col-3">
              <h6 className="filter-leble">Collection</h6>
              <NiceSelect
                options={options}
                placeholder="Sort by Collection"
                onChange={(e) => console.log(e)}
                name="like"
              />
            </div>

            <div className="filter-select-option col-3">
              <h6 className="filter-leble">Creation Date</h6>
              <NiceSelect
                options={[
                  { value: 'least-liked', text: 'Recently Created', direction: 'asc' },
                  { value: 'most-liked', text: 'Anciently Created', direction: 'desc' },
                ]}
                placeholder="Sort by Uploaded Date"
                onChange={(e) => console.log(e)}
                name="like"
              />
            </div>

            <div className="filter-select-option col-3">
              <h6 className="filter-leble">Minting Type</h6>
              <NiceSelect
                options={[
                  { value: 'most-liked', text: 'Lazy Minting', direction: 'desc' },
                  { value: 'least-liked', text: 'Normal Minting', direction: 'asc' },
                ]}
                placeholder="Sort by Items quantity"
                onChange={(e) => console.log(e)}
                name="like"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsFilter;
