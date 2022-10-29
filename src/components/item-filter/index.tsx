import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import NiceSelect from '@ui/nice-select';
import { Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';
import {
  selectCoastedItem,
  selectFilteredItems,
} from '../../features/leda-nft/store/leda-nft.slice';
import useAppSelector from '../../store/hooks/useAppSelector';
import SliderTrack from '../ui/input-range/slider-track';
import SliderThumb from '../ui/input-range/slider-thumb';
import { Props, FilterType } from '../../types/item-filter-types';

const ItemFilter = ({ setNfts }: Props) => {
  const cheapest: number = useAppSelector((state) => selectCoastedItem(state, 'cheapest'));
  const mostExpensive: number = useAppSelector((state) => selectCoastedItem(state, 'expensive'));

  // TODO: This values are just for testing and will
  // TODO: be addessed dynamically down the road
  // TODO: i.e: on the priceRange.from we should get
  // TODO: the lowest price from an NFT, and on the priceRange.to,
  // TODO: the most expensive price from an NFT.
  const [filterData, setFilterData] = useState({
    likesDirection: '',
    NFTauthor: 'all',
    NFTtitle: 'all',
    NFTdescription: 'all',
    priceRange: {
      from: cheapest,
      to: mostExpensive,
    },
  } as FilterType);

  const [isOpen, setIsOpen] = useState(false as boolean);
  const [valuesRange, setValuesRange] = useState([cheapest, mostExpensive] as number[]);

  const filteredItems = useAppSelector((state) =>
    selectFilteredItems(
      state,
      filterData.NFTauthor,
      filterData.NFTtitle,
      filterData.NFTdescription,
      filterData.priceRange.from,
      filterData.priceRange.to,
      filterData.likesDirection
    )
  );

  const renderTrack = (props: IRenderTrackParams) => (
    <SliderTrack {...props} min={cheapest} max={mostExpensive} values={valuesRange} />
  );

  const handleTriggerButton = () => {
    setIsOpen(!isOpen);
  };

  const handleLikesChange = (order: string) => {
    const newState = { ...filterData, likesDirection: order };
    setFilterData(newState);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...filterData, NFTtitle: e.target.value };
    setFilterData(newState);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...filterData, NFTdescription: e.target.value };
    setFilterData(newState);
  };

  const handlePriceRangeChange = (vals: number[]) => {
    setValuesRange(vals);
    const newState = { ...filterData, priceRange: { from: vals[0], to: vals[1] } };
    setFilterData(newState);
  };

  useEffect(() => {
    setNfts(filteredItems);
  }, [filteredItems]);

  // Uncomment this when we implement author username feature
  /* const handleAuthorChange = (e: any) => {
    setNFTauthor(e.target.value);
  }; */

  return (
    <div>
      <div
        className="view-more-btn text-start text-sm-end mb-4"
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

      {/* Filter Logic */}

      {isOpen && (
        <div className="default-exp-wrapper default-exp-expand">
          <div className="inner">
            {/* NFT Likes Order */}
            <div className="filter-select-option">
              <h6 className="filter-leble">LIKES</h6>
              <NiceSelect
                options={[
                  { value: 'most-liked', text: 'Most liked', direction: 'desc' },
                  { value: 'least-liked', text: 'Least liked', direction: 'asc' },
                ]}
                placeholder="Sort by likes"
                onChange={(e) => handleLikesChange(e)}
                name="like"
              />
            </div>
            {/*  */}

            {/* NFT Author Filter */}
            {/* <div className="filter-select-option">
              <h6 className="filter-leble">Author</h6>
              <input
                className="nice-select text-white"
                placeholder="NFT Author"
                onChange={handleAuthorChange}
              />
            </div> */}
            {/*  */}

            {/* NFT Title Filter */}
            <div className="filter-select-option">
              <h6 className="filter-leble">Title</h6>
              <input
                className="nice-select text-white"
                placeholder="NFT Title"
                onChange={handleTitleChange}
              />
            </div>
            {/*  */}

            {/* NFT Description Filter */}
            <div className="filter-select-option">
              <h6 className="filter-leble">Description</h6>
              <input
                className="nice-select text-white"
                placeholder="NFT Description"
                onChange={handleDescriptionChange}
              />
            </div>
            {/*  */}

            {/* NFT Price Range Filter */}
            <div className="filter-select-option">
              <h6 className="filter-leble">Price Range</h6>
              <div className="price_filter s-filter clear">
                <div className="input-range">
                  <Range
                    values={valuesRange}
                    step={0.01}
                    min={cheapest}
                    max={mostExpensive}
                    onChange={(vals) => handlePriceRangeChange(vals)}
                    renderTrack={renderTrack}
                    renderThumb={SliderThumb}
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
            {/*  */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemFilter;
