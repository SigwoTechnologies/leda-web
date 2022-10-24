import clsx from 'clsx';
import FilterFunctionality from '@components/product-filter';
import { forwardRef, useState, useEffect } from 'react';
import NiceSelect from '@ui/nice-select';
import InputRange from '@ui/input-range';
import { InputPrice } from '@types';
import {
  selectSortedByLikes,
  selectSortedByPriceRange,
  selectSortedByAuthor,
  selectSortedByDescription,
  selectSortedByTitle,
} from '../../features/leda-nft/store/leda-nft.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  setNfts?: any;
};

const ItemFilter = ({ setNfts }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [likesDirections, setLikesDirections] = useState('');

  // ? Sort by likes with asc and desc order
  const sortedByLikes = useAppSelector((state) => selectSortedByLikes(state, likesDirections));
  // ? Sort by price range. Nft must be higher the min and less than the max
  const sortedByPriceRange = useAppSelector((state) => selectSortedByPriceRange(state, 2, 8));
  // ? Sort by NFT author name
  const sortedByAuthor = useAppSelector((state) =>
    selectSortedByAuthor(state, '0x70997970c51812dc3a010c7d01b50e0d17dc79c8')
  );
  // ? Sorty by NFT title
  const sortedByTitle = useAppSelector((state) => selectSortedByTitle(state, 's'));
  // ? Sort by NFT description
  const sortedByDescription = useAppSelector((state) => selectSortedByDescription(state, 'This'));

  console.log(sortedByAuthor);
  console.log(sortedByTitle);
  console.log(sortedByDescription);

  const handleLikesChange = (e: any) => {
    setLikesDirections(e.direction);
    setNfts(sortedByLikes);
  };

  const handleCategoryChange = () => {};

  const handleCollectionsHange = () => {};

  const handleSaleTypeChange = () => {};

  const handlePriceRangeChange = () => {};

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

      {/* Filter Logic */}

      {isOpen ? (
        <div className="default-exp-wrapper default-exp-expand">
          <div className="inner">
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
            <div className="filter-select-option">
              <h6 className="filter-leble">Category</h6>
              <NiceSelect
                options={[
                  { value: 'all', text: 'All Category' },
                  { value: 'art', text: 'Art' },
                  { value: 'music', text: 'Music' },
                  { value: 'video', text: 'Video' },
                  { value: 'Collectionable', text: 'Collectionable' },
                ]}
                placeholder="Category"
                onChange={handleCategoryChange}
                name="category"
              />
            </div>
            <div className="filter-select-option">
              <h6 className="filter-leble">Collections</h6>
              <NiceSelect
                options={[
                  { value: 'all', text: 'All Collection' },
                  { value: 'Art Decco', text: 'Art Decco' },
                  {
                    value: 'BoredApeYachtClub',
                    text: 'BoredApeYachtClub',
                  },
                  {
                    value: 'MutantApeYachtClub',
                    text: 'MutantApeYachtClub',
                  },
                  {
                    value: 'Art Blocks Factory',
                    text: 'Art Blocks Factory',
                  },
                ]}
                placeholder="Collections"
                onChange={handleCollectionsHange}
                name="collection"
              />
            </div>

            <div className="filter-select-option">
              <h6 className="filter-leble">Sale type</h6>
              <NiceSelect
                options={[
                  { value: 'all', text: 'All Type' },
                  { value: 'fixed-price', text: 'Fixed price' },
                  { value: 'timed-auction', text: 'Timed auction' },
                  { value: 'not-for-sale', text: 'Not for sale' },
                  {
                    value: 'open-for-offers',
                    text: 'Open for offers',
                  },
                ]}
                placeholder="Sale type"
                onChange={handleSaleTypeChange}
                name="sale_type"
              />
            </div>
            <div className="filter-select-option">
              <h6 className="filter-leble">Price Range</h6>
              <div className="price_filter s-filter clear">
                <form action="#" method="GET">
                  {/* <InputRange values={inputs.price} onChange={priceHandler} /> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* {isOpen ? <FilterFunctionality /> : null} */}
    </div>
  );
};

export default ItemFilter;
