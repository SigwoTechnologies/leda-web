import { forwardRef, useState, useEffect } from 'react';
import NiceSelect from '@ui/nice-select';
import InputRange from '@ui/input-range';
import { InputPrice } from '@types';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectState } from '../../features/leda-nft/store/leda-nft.slice';

/* type Props = {
  slectHandler?: ({ value }: any, name: any) => void;
  sortHandler?: ({ value }: any, name: any) => void;
  priceHandler?: ({ value }: any, name: any) => void;
  inputs?: InputPrice;
}; */

const ItemFilter = () => {
  const { items } = useAppSelector(selectState);
  const [nfts, setNfts] = useState([...items]);

  useEffect(() => {
    const res = [...items];
    setNfts(res);
  }, [items]);

  const handleLikesChange = (e: any) => {
    if (nfts && nfts.length > 0) {
      // TODO: Set the "founded" on the store (redux)
      if (e.value.includes('most')) {
        // higher to lower
        const founded = nfts.sort((a, b) => b.likes - a.likes);
        console.log(founded);
        console.log('most liked');
      } else {
        // lower to higher
        const founded = nfts.sort((a, b) => a.likes - b.likes);
        console.log(founded);
        console.log('least liked');
      }
    }
  };

  const handleCategoryChange = () => {};

  const handleCollectionsHange = () => {};

  const handleSaleTypeChange = () => {};

  const handlePriceRangeChange = () => {};

  return (
    <div className="default-exp-wrapper default-exp-expand">
      <div className="inner">
        <div className="filter-select-option">
          <h6 className="filter-leble">LIKES</h6>
          <NiceSelect
            options={[
              { value: 'most-liked', text: 'Most liked' },
              { value: 'least-liked', text: 'Least liked' },
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
  );
};

export default ItemFilter;
