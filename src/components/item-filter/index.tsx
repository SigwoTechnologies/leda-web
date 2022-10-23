import { useState } from 'react';
import clsx from 'clsx';
import FilterFunctionality from '@components/product-filter';

const ItemFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerButton = () => {
    setIsOpen(!isOpen);
  };

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

      {isOpen ? <FilterFunctionality /> : null}
    </div>
  );
};

export default ItemFilter;
