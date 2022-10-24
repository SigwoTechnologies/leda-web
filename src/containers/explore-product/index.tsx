import { useState, useRef, useReducer, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import SectionTitle from '@components/section-title';
import Item from '@components/item';
import { Item as ItemType } from '@types';
import FilterButton from '@ui/filter-button';
import ProductFilter from '@components/product-filter';
import ItemFilter from '@components/item-filter';

type Props = {
  className?: string;
  space?: number | 1 | 2;
  items: ItemType[];
};

const ProductArea = ({ className, space, items }: Props) => (
  <div className={clsx('rn-product-area', space === 1 && 'rn-section-gapTop', className)}>
    <div className="container">
      {/* <ItemFilter /> */}
      <div className="row g-5">
        {items && items.length > 0 ? (
          <>
            {items.map((item: ItemType) => (
              <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                <Item
                  title={item.name}
                  itemId={item.itemId}
                  tokenId={item.tokenId}
                  latestBid=""
                  likeCount={item.likes}
                  imageString={item.image.url}
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

export default ProductArea;
