import clsx from 'clsx';
import FilterFunctionality from '@components/product-filter';
import { forwardRef, useState, useEffect } from 'react';
import NiceSelect from '@ui/nice-select';
import { InputPrice } from '@types';
import { Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';
import {
  selectSortedByLikes,
  selectSortedByPriceRange,
  selectSortedByAuthor,
  selectSortedByDescription,
  selectSortedByTitle,
  selectFilteredItems,
} from '../../features/leda-nft/store/leda-nft.slice';
import useAppSelector from '../../store/hooks/useAppSelector';
import SliderTrack from '../ui/input-range/slider-track';
import SliderThumb from '../ui/input-range/slider-thumb';

type Props = {
  setNfts?: any;
};

const ItemFilter = ({ setNfts }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valuesRange, setValuesRange] = useState([0.1, 4]);
  const [likesDirections, setLikesDirections] = useState('');
  const [NFTauthor, setNFTauthor] = useState('all');
  const [NFTtitle, setNFTtitle] = useState('all');
  const [NFTdescription, setNFTdescription] = useState('all');
  const [priceRange, setPriceRange] = useState({
    from: 0.2,
    to: 4,
  });

  // ? Sort by likes with asc and desc order
  const sortedByLikes = useAppSelector((state) => selectSortedByLikes(state, likesDirections));
  // ? Sort by price range. Nft must be higher the min and less than the max
  // TODO: Get the most expensive item from the store and set it as priceRange.to
  const sortedByPriceRange = useAppSelector((state) =>
    selectSortedByPriceRange(state, priceRange.from, priceRange.to)
  );
  // TODO: The logic is working fine, but we should change the data from the user and add a username
  // ? Sort by NFT author name
  const sortedByAuthor = useAppSelector((state) => selectSortedByAuthor(state, NFTauthor));
  // ? Sorty by NFT title
  const sortedByTitle = useAppSelector((state) => selectSortedByTitle(state, NFTtitle));
  // ? Sort by NFT description
  const sortedByDescription = useAppSelector((state) =>
    selectSortedByDescription(state, NFTdescription)
  );
  const filteredItems = useAppSelector((state) =>
    selectFilteredItems(
      state,
      NFTauthor,
      NFTtitle,
      NFTdescription,
      priceRange.from,
      priceRange.to,
      likesDirections
    )
  );

  const renderTrack = (props: IRenderTrackParams) => (
    <SliderTrack {...props} min={0.1} max={4} values={valuesRange} />
  );

  const handleTriggerButton = () => {
    setIsOpen(!isOpen);
  };

  const handleLikesChange = (e: any) => {
    setLikesDirections(e.direction);
    /* setNfts(sortedByLikes); */
  };

  const handleAuthorChange = (e: any) => {
    setNFTauthor(e.target.value);
    /* setNfts(sortedByAuthor); */
  };

  const handleTitleChange = (e: any) => {
    setNFTtitle(e.target.value);
    /* setNfts(sortedByTitle); */
  };

  const handleDescriptionChange = (e: any) => {
    setNFTdescription(e.target.value);
    /* setNfts(sortedByDescription); */
  };

  const handlePriceRangeChange = (vals: number[]) => {
    setPriceRange({
      from: vals[0],
      to: vals[1],
    });
    setValuesRange(vals);
    /* setNfts(sortedByPriceRange); */
  };

  /* useEffect(() => {
    console.log(sortedByPriceRange);
  }, [sortedByPriceRange]); */

  console.log(filteredItems);
  useEffect(() => {
    setNfts(filteredItems);
  }, [filteredItems]);

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

      {/* Filter Logic */}

      {isOpen ? (
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
                onChange={handleLikesChange}
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
                    step={0.1}
                    min={0.1}
                    max={4}
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
      ) : null}
    </div>
  );
};

export default ItemFilter;
