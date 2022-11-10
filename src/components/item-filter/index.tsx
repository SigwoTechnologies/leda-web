import { IRenderTrackParams } from 'react-range/lib/types';
import { Range } from 'react-range';
import clsx from 'clsx';
import NiceSelect from '@ui/nice-select';
import React, { useEffect, useState } from 'react';
import SliderThumb from '../ui/input-range/slider-thumb';
import SliderTrack from '../ui/input-range/slider-track';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import {
  selectNFTsMarketplace,
  setMarketplaceFilters,
} from '../../features/marketplace/store/marketplace.slice';

type Props = {
  cheapest: number;
  mostExpensive: number;
};

const DEFAULT_STEP = 1;
const STEP_FACTOR = 1000;
const STEP_PRECISION = 3;

const ItemFilter = ({ cheapest, mostExpensive }: Props) => {
  const dispatch = useAppDispatch();
  const { marketplaceFilters } = useAppSelector(selectNFTsMarketplace);
  const [isOpen, setIsOpen] = useState(true);
  const [valuesRange, setValuesRange] = useState([] as number[]);
  const [step, setStep] = useState(DEFAULT_STEP);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    if (cheapest >= 0 && mostExpensive >= 0) {
      setValuesRange([cheapest, mostExpensive]);

      const newStep = Number(
        ((mostExpensive - cheapest) / STEP_FACTOR).toPrecision(STEP_PRECISION)
      );

      setStep(newStep || DEFAULT_STEP);
    }
  }, [cheapest, mostExpensive]);

  const renderTrack = (props: IRenderTrackParams) => (
    <SliderTrack {...props} min={cheapest} max={mostExpensive} values={valuesRange} />
  );

  const handleTriggerButton = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setValuesRange([cheapest, mostExpensive]);
    }
  };

  const handleLikesChange = (order: string) => {
    dispatch(setMarketplaceFilters({ ...marketplaceFilters, likesDirection: order }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setMarketplaceFilters({ ...marketplaceFilters, search: localSearch }));
    }
  };

  const handlePriceRangeChange = (vals: number[]) => {
    setValuesRange(vals);
  };

  const handlePriceRangeFinalChange = (vals: number[]) => {
    setValuesRange(vals);
    dispatch(
      setMarketplaceFilters({
        ...marketplaceFilters,
        priceRange: { from: valuesRange[0], to: valuesRange[1] },
      })
    );
  };

  return (
    <div>
      <div
        className="view-more-btn text-start text-sm-end mb-5"
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
                onChange={handleSearchChange}
                onKeyUp={handleSearch}
              />
            </div>

            <div className="filter-select-option">
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

            <div className="filter-select-option">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemFilter;
