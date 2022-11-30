import SliderThumb from '@ui/input-range/slider-thumb';
import SliderTrack from '@ui/input-range/slider-track';
import NiceSelect from '@ui/nice-select';
import Sticky from '@ui/sticky';
import { useEffect, useMemo, useState } from 'react';
import { Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';
import {
  selectCurrentSelectionItemsFiltering,
  setCollectionsNftsFilters,
} from '../../features/collections/store/collections.slice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectUiReducer } from '../../store/ui/ui.slice';

type Props = {
  cheapest: number;
  mostExpensive: number;
};

const DEFAULT_STEP = 1;
const STEP_FACTOR = 1000;
const STEP_PRECISION = 3;

const ItemCollectionFilter = ({ cheapest, mostExpensive }: Props) => {
  const dispatch = useAppDispatch();
  const { isNetworkAdviceOpen } = useAppSelector(selectUiReducer);
  const [localSearch, setLocalSearch] = useState('');
  const [valuesRange, setValuesRange] = useState([] as number[]);
  const [step, setStep] = useState(DEFAULT_STEP);
  const { itemsFilters, itemsPagination } = useAppSelector(selectCurrentSelectionItemsFiltering);

  const stickyPadding = useMemo(
    () => (isNetworkAdviceOpen ? '150px' : '100px'),
    [isNetworkAdviceOpen]
  );

  useEffect(() => {
    if (Number(itemsFilters.mostExpensive) > 0 && Number(itemsFilters.cheapest) > 0)
      setValuesRange([+itemsFilters.cheapest, +itemsFilters.mostExpensive]);
  }, [itemsFilters.mostExpensive, itemsFilters.cheapest]);

  useEffect(() => {
    if (cheapest >= 0 && mostExpensive >= 0) {
      /* setValuesRange([cheapest, mostExpensive]); */

      const newStep = Number(
        ((mostExpensive - cheapest) / STEP_FACTOR).toPrecision(STEP_PRECISION)
      );

      setStep(newStep || DEFAULT_STEP);
    }
  }, [cheapest, mostExpensive]);

  const handleLikesChange = (order: string) => {
    dispatch(setCollectionsNftsFilters({ ...itemsFilters, likesDirection: order }));
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

  const handlePriceRangeFinalChange = (vals: number[]) => {
    setValuesRange(vals);
    dispatch(
      setCollectionsNftsFilters({
        ...itemsFilters,
        priceRange: { from: valuesRange[0], to: valuesRange[1] },
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
                        onChange={(vals) => handlePriceRangeChange(vals)}
                        onFinalChange={(vals) => handlePriceRangeFinalChange(vals)}
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
                  onChange={(e) => handleLikesChange(e)}
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
