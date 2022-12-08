import clsx from 'clsx';

type Props = {
  isOpen: boolean;
};

const SearchForm = ({ isOpen }: Props) => (
  <form
    id="header-search-1"
    action="#"
    method="GET"
    className={clsx('large-mobile-blog-search', isOpen && 'active')}
  >
    <div className="rn-search-mobile form-group">
      <button type="submit" className="search-button">
        <i className="feather-search" />
      </button>
      <input type="text" placeholder="Search ...xx" />
    </div>
  </form>
);

export default SearchForm;
