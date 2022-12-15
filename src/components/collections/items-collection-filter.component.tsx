import SliderThumb from '@ui/input-range/slider-thumb';
import SliderTrack from '@ui/input-range/slider-track';
import NiceSelect from '@ui/nice-select';
import Sticky from '@ui/sticky';
import { useEffect, useMemo, useState } from 'react';
import { Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';
import { findPriceRange } from '../../features/collections/store/collections.actions';
import { setCollectionsNftsFilters } from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectUiReducer } from '../../store/ui/ui.slice';

type PriceRange = {
  cheapest: number;
  mostExpensive: number;
};

const DEFAULT_STEP = 1;
const STEP_FACTOR = 1000;
const STEP_PRECISION = 3;

const ItemCollectionFilter = () => {
  const dispatch = useAppDispatch();
  const { isNetworkAdviceOpen } = useAppSelector(selectUiReducer);
  const [localSearch, setLocalSearch] = useState('');
  const [{ cheapest, mostExpensive }, setPriceRange] = useState<PriceRange>({
    cheapest: 0,
    mostExpensive: 1000,
  });
  const [valuesRange, setValuesRange] = useState<number[]>([]);
  const [step, setStep] = useState(DEFAULT_STEP);
  const {
    selectedCollection,
    collectionItemsFiltering: { itemsFilters, itemsPagination },
  } = useAppSelector((state) => state.collections);

  const stickyPadding = useMemo(
    () => (isNetworkAdviceOpen ? '150px' : '100px'),
    [isNetworkAdviceOpen]
  );

  useEffect(() => {
    if (itemsPagination.items.length && itemsPagination.totalCount) {
      const itemsWithPrice = itemsPagination.items.filter((item) => item.price !== null);
      if (itemsWithPrice.length) {
        dispatch(findPriceRange(selectedCollection.id)).then(({ payload }) => {
          const { from, to } = payload as { from: number; to: number };
          setPriceRange({
            cheapest: from,
            mostExpensive: to,
          });
        });
      }
    }
  }, [dispatch, itemsPagination.items, itemsPagination.totalCount, selectedCollection.id]);

  useEffect(() => {
    if (Number(itemsFilters.mostExpensive) > 0 && Number(itemsFilters.cheapest) > 0)
      setValuesRange([+itemsFilters.cheapest, +itemsFilters.mostExpensive]);
  }, [itemsFilters.mostExpensive, itemsFilters.cheapest]);

  useEffect(() => {
    if (cheapest >= 0 && mostExpensive >= 0) {
      const newStep = Number(
        ((mostExpensive - cheapest) / STEP_FACTOR).toPrecision(STEP_PRECISION)
      );

      setStep(newStep || DEFAULT_STEP);
    }
  }, [cheapest, mostExpensive]);

  const handleLikesChange = (likesDirection: string) => {
    dispatch(setCollectionsNftsFilters({ ...itemsFilters, likesDirection }));
  };

  const renderTrack = (props: IRenderTrackParams) => (
    <SliderTrack {...props} min={cheapest} max={mostExpensive} values={valuesRange} />
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setCollectionsNftsFilters({ ...itemsFilters, search: localSearch }));
    }
  };

  const handlePriceRangeChange = (vals: number[]) => {
    setValuesRange(vals);
  };

  const handlePriceRangeFinalChange = ([from, to]: number[]) => {
    dispatch(
      setCollectionsNftsFilters({
        ...itemsFilters,
        priceRange: { from, to },
      })
    );
  };

  const displayFilters = cheapest >= 0 && mostExpensive >= 0 && cheapest !== mostExpensive;

  return (
    <Sticky top={stickyPadding}>
      <div className="">
        <nav className="left-nav rbt-sticky-top-adjust-five">
          <div className="nav nav-tabs p-5" style={{ marginRight: '10px' }}>
            <div className="d-flex flex-column" style={{ width: '100%' }}>
              <div className="filter-select-option">
                <h6 className="filter-leble">Search</h6>
                <input
                  className="nice-select text-white"
                  placeholder="Search by title or description"
                  onChange={handleSearchChange}
                  onKeyUp={handleSearch}
                />
              </div>
              {displayFilters && (
                <div className="filter-select-option mt-5">
                  <h6 className="filter-leble">Price Range</h6>
                  <div className="price_filter s-filter clear">
                    <div className="input-range">
                      <Range
                        values={valuesRange}
                        step={step}
                        min={cheapest}
                        max={mostExpensive}
                        renderTrack={renderTrack}
                        renderThumb={SliderThumb}
                        onChange={handlePriceRangeChange}
                        onFinalChange={handlePriceRangeFinalChange}
                      />
                      <div className="slider__range--output">
                        <div className="price__output--wrap">
                          <div className="price--output">
                            <span>Price:</span>
                            <span className="output-label">
                              <span>ETH</span> {valuesRange[0]} - <span>ETH</span> {valuesRange[1]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="filter-select-option mt-5">
                <h6 className="filter-leble">Popularity</h6>
                <NiceSelect
                  options={[
                    { value: 'most-liked', text: 'Most popular', direction: 'desc' },
                    { value: 'least-liked', text: 'Less popular', direction: 'asc' },
                  ]}
                  placeholder="Sort by likes"
                  onChange={handleLikesChange}
                  name="like"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </Sticky>
  );
};

export default ItemCollectionFilter;
