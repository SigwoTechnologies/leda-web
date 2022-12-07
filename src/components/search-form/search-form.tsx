const SearchForm = () => (
  <form className="search-form-wrapper" action="#">
    <input
      type="search"
      placeholder="Search Here"
      aria-label="Search"
      style={{ paddingBlock: '10px' }}
    />
    <div className="search-icon">
      <button type="button">
        <i className="feather-search" />
      </button>
    </div>
  </form>
);

export default SearchForm;
