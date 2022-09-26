import clsx from 'clsx';

type Props = {
  onClick: () => void;
  open?: boolean;
};

const FilterButton = ({ onClick, open }: Props) => (
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
        open && 'open'
      )}
      onClick={onClick}
    >
      Filter
      <i className="feather-filter" />
    </button>
  </div>
);

export default FilterButton;
