import clsx from 'clsx';
import SectionTitle from '@components/section-title';
import Product from '@components/product';
import { Item } from '@types';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'FILTER_TOGGLE':
      return { ...state, filterToggle: !state.filterToggle };
    case 'SET_INPUTS':
      return { ...state, inputs: { ...state.inputs, ...action.payload } };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

type Props = {
  className?: string;
  space?: number | 1 | 2;
  items: Item[];
};

const ProductArea = ({ className, space, items }: Props) => (
  // const itemsToFilter = [...data.products];
  // const [state, dispatch] = useReducer(reducer, {
  //   filterToggle: false,
  //   products: data.products || [],
  //   inputs: { price: [0, 100] },
  // });
  // const filterRef = useRef(null);
  // const filterHandler = () => {
  //   dispatch({ type: 'FILTER_TOGGLE' });
  //   if (!filterRef.current) return;
  //   slideToggle(filterRef.current);
  // };

  // const slectHandler = ({ value }: any, name: any) => {
  //   dispatch({ type: 'SET_INPUTS', payload: { [name]: value } });
  // };

  // const priceHandler = (value: any) => {
  //   dispatch({ type: 'SET_INPUTS', payload: { price: value } });
  // };

  // const sortHandler = ({ value }: any) => {
  //   const sortedProducts = state.products.sort((a: any, b: any) => {
  //     if (value === 'most-liked') {
  //       return a.likeCount < b.likeCount ? 1 : -1;
  //     }
  //     return a.likeCount > b.likeCount ? 1 : -1;
  //   });
  //   dispatch({ type: 'SET_PRODUCTS', payload: sortedProducts });
  // };

  // const filterMethods = (item: any, filterKey: any, value: any) => {
  //   if (value === 'all') return false;
  //   let itemKey = filterKey;
  //   if (filterKey === 'category') {
  //     itemKey = 'categories';
  //   }
  //   if (filterKey === 'price') {
  //     return item[itemKey].amount <= value[0] / 100 || item[itemKey].amount >= value[1] / 100;
  //   }
  //   if (Array.isArray(item[itemKey])) {
  //     return !item[itemKey].includes(value);
  //   }
  //   if (filterKey === 'collection') {
  //     return item[itemKey].name !== value;
  //   }
  //   return item[itemKey] !== value;
  // };

  // const itemFilterHandler = useCallback(() => {
  //   let filteredItems = [];

  //   filteredItems = itemsToFilter.filter((item) => {
  //     // eslint-disable-next-line no-restricted-syntax
  //     for (const key in state.inputs) {
  //       if (filterMethods(item, key, state.inputs[key])) return false;
  //     }
  //     return true;
  //   });
  //   dispatch({ type: 'SET_PRODUCTS', payload: filteredItems });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.inputs]);

  // useEffect(() => {
  //   itemFilterHandler();
  // }, [itemFilterHandler]);
  <div className={clsx('rn-product-area', space === 1 && 'rn-section-gapTop', className)}>
    <div className="container">
      <div className="row mb--50 align-items-center">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          {/* {data?.section_title && <SectionTitle className="mb--0" {...data.section_title} />} */}
          <SectionTitle className="mb--0" title="Items" />
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
          <FilterButton open={state.filterToggle} onClick={filterHandler} />
        </div> */}
      </div>

      {/* <ProductFilter
        ref={filterRef}
        slectHandler={slectHandler}
        sortHandler={sortHandler}
        priceHandler={priceHandler}
        inputs={state.inputs}
      /> */}
      <div className="row g-5">
        {items && items.length > 0 ? (
          <>
            {items.map((item: Item) => (
              <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                <Product
                  title={item.name}
                  itemId={item.itemId}
                  tokenId={item.tokenId}
                  latestBid=""
                  likeCount={item.likes}
                  // image={prod.images?.[0]}
                  imageString={item.image.url}
                  // authors={prod.authors}
                  // bitCount={prod.bitCount}
                />
              </div>
            ))}
          </>
        ) : (
          <p>No item to show</p>
        )}
      </div>
    </div>
  </div>
);
// ExploreProductArea.propTypes = {
//   className: PropTypes.string,
//   space: PropTypes.oneOf([1, 2]),
//   data: PropTypes.shape({
//     section_title: SectionTitleType,
//     products: PropTypes.arrayOf(ProductType),
//     placeBid: PropTypes.bool,
//   }),
// };

// ExploreProductArea.defaultProps = {
//   space: 1,
// };

export default ProductArea;
