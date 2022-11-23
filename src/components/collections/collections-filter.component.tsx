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
          <div className="inner row" style={{ width: 'auto' }}>
            <div className="filter-select-option col-3">
              <h6 className="filter-leble">Search</h6>
              <input className="nice-select text-white" placeholder="Search by title" />
            </div>

            <div className="filter-select-option col-3">
              <h6 className="filter-leble">Collection</h6>
              <NiceSelect
                options={[
                  { value: 'least-liked', text: 'Dogs (215)', direction: 'asc' },
                  { value: 'most-liked', text: 'Cars (195)', direction: 'desc' },
                  { value: 'most-liked', text: 'Space (154)', direction: 'desc' },
                  { value: 'most-liked', text: 'World (120)', direction: 'desc' },
                  { value: 'most-liked', text: 'Security (110)', direction: 'desc' },
                  { value: 'most-liked', text: 'Bikes (50)', direction: 'desc' },
                ]}
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
              <h6 className="filter-leble">Largest Collection</h6>
              <NiceSelect
                options={[
                  { value: 'most-liked', text: 'Biggest', direction: 'desc' },
                  { value: 'least-liked', text: 'Smallest', direction: 'asc' },
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
