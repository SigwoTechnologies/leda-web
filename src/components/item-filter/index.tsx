import clsx from 'clsx';
import FilterFunctionality from '@components/product-filter';
import { forwardRef, useState, useEffect } from 'react';
import NiceSelect from '@ui/nice-select';
import InputRange from '@ui/input-range';
import { InputPrice } from '@types';
import { Range } from 'react-range';
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
  const [NFTauthor, setNFTauthor] = useState('0x');
  const [NFTtitle, setNFTtitle] = useState('');
  const [NFTdescription, setNFTdescription] = useState('');
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
  // ? Sort by NFT author name
  const sortedByAuthor = useAppSelector((state) => selectSortedByAuthor(state, NFTauthor));
  // ? Sorty by NFT title
  const sortedByTitle = useAppSelector((state) => selectSortedByTitle(state, NFTtitle));
  // ? Sort by NFT description
  const sortedByDescription = useAppSelector((state) =>
    selectSortedByDescription(state, NFTdescription)
  );

  useEffect(() => {
    console.log(sortedByPriceRange);
  }, [sortedByPriceRange]);

  const handleLikesChange = (e: any) => {
    setLikesDirections(e.direction);
    setNfts(sortedByLikes);
  };

  const handleAuthorChange = (e: any) => {
    setNFTauthor(e.target.value);
  };

  const handleTitleChange = (e: any) => {
    setNFTtitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setNFTdescription(e.target.value);
  };

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
              <h6 className="filter-leble">Author</h6>
              <input
                className="nice-select text-white"
                placeholder="NFT Author"
                onChange={handleAuthorChange}
              />
            </div>
            <div className="filter-select-option">
              <h6 className="filter-leble">Title</h6>
              <input
                className="nice-select text-white"
                placeholder="NFT Title"
                onChange={handleTitleChange}
              />
            </div>

            <div className="filter-select-option">
              <h6 className="filter-leble">Description</h6>
              <input
                className="nice-select text-white"
                placeholder="NFT Description"
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="filter-select-option">
              <h6 className="filter-leble">Price Range</h6>
              <div className="price_filter s-filter clear">
                <form action="#" method="GET">
                  <InputRange setPriceRange={setPriceRange} />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ItemFilter;
