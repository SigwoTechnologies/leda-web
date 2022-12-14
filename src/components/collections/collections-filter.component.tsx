import NiceSelect from '@ui/nice-select';
import clsx from 'clsx';
import { useState } from 'react';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { setCollectionsFilters } from '../../features/marketplace/store/marketplace.slice';

const CollectionsFilter = () => {
  const dispatch = useAppDispatch();
  const { collectionsFilters } = useAppSelector((state) => state.marketplace);
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const handleTriggerButton = () => setIsOpen((prev) => !prev);

  const handleCreatedChange = (order: string) => {
    dispatch(setCollectionsFilters({ ...collectionsFilters, creationOrder: order }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setCollectionsFilters({ ...collectionsFilters, search: localSearch }));
    }
  };

  const handlePopularityChange = (order: string) => {
    dispatch(setCollectionsFilters({ ...collectionsFilters, popularityOrder: order }));
  };

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
            <div className="filter-select-option col-4">
              <h6 className="filter-leble">Search</h6>
              <input
                className="nice-select text-white"
                placeholder="Search by title"
                onChange={handleSearchChange}
                onKeyUp={handleSearch}
              />
            </div>

            <div className="filter-select-option col-4">
              <h6 className="filter-leble">Popularity</h6>
              <NiceSelect
                options={[
                  { value: 'most-liked', text: 'Most popular', direction: 'desc' },
                  { value: 'least-liked', text: 'Less popular', direction: 'asc' },
                ]}
                placeholder="Sort by likes"
                onChange={(e) => handlePopularityChange(e)}
                name="like"
              />
            </div>

            <div className="filter-select-option col-4">
              <h6 className="filter-leble">Creation Date</h6>
              <NiceSelect
                options={[
                  { value: 'least-liked', text: 'Newest First', direction: 'desc' },
                  { value: 'most-liked', text: 'Oldest First', direction: 'asc' },
                ]}
                placeholder="Sort by Uploaded Date"
                onChange={(e) => handleCreatedChange(e)}
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
