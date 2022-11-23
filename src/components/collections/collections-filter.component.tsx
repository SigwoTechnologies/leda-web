import NiceSelect from '@ui/nice-select';
import clsx from 'clsx';
import { useState } from 'react';

const CollectionsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleTriggerButton = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div
        className="view-more-btn text-start text-sm-end"
        data-sal-delay="150"
        data-sal="slide-up"
        data-sal-duration="800"
      >
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
          <div className="inner">
            <div className="filter-select-option">
              <h6 className="filter-leble">Search</h6>
              <input
                className="nice-select text-white"
                placeholder="Search by title or description"
              />
            </div>

            <div className="filter-select-option">
              <h6 className="filter-leble">Date</h6>
              <NiceSelect
                options={[
                  { value: 'least-liked', text: 'Older', direction: 'asc' },
                  { value: 'most-liked', text: 'Newest', direction: 'desc' },
                ]}
                placeholder="Sort by newest"
                onChange={(e) => console.log(e)}
                name="like"
              />
            </div>

            <div className="filter-select-option">
              <h6 className="filter-leble">Items Inside</h6>
              <NiceSelect
                options={[
                  { value: 'most-liked', text: 'Big', direction: 'desc' },
                  { value: 'least-liked', text: 'Small', direction: 'asc' },
                ]}
                placeholder="Sort by likes"
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
