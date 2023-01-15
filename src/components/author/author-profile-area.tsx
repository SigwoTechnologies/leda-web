import InfiniteScroll from '@components/common/InfiniteScroll';
import { ItemCard } from '@components/ItemCard';
import {
  findCreatedItemsByAccount,
  findOnSaleItemsByAccount,
  findOwnedItemsByAccount,
} from '@features/auth/store/account.actions';
import { resetFilters } from '@features/marketplace/store/marketplace.slice';
import useAppDispatch from '@store/hooks/useAppDispatch';
import useAppSelector from '@store/hooks/useAppSelector';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import { Item } from '../../types/item';

enum NavTabs {
  ON_SALE,
  OWNED,
  CREATED,
  LIKED,
}

export const AuthorProfileArea = () => {
  const dispatch = useAppDispatch();
  const {
    account: { address },
  } = useAppSelector((state) => state.auth);
  const { likedItems, items, filters, itemsCount, isPagingLoading } = useAppSelector(
    (state) => state.marketplace
  );
  const [navTab, setNavTab] = useState<NavTabs>(NavTabs.OWNED);

  // TODO: Implement infinite scroll
  const likedItemsToShow = useMemo(
    () => likedItems.filter((item) => !item.isHidden || item.owner.address === address),
    [likedItems, address]
  );

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch, navTab]);

  useEffect(() => {
    if (navTab === NavTabs.OWNED) {
      dispatch(findOwnedItemsByAccount(filters));
    }
    if (navTab === NavTabs.CREATED) {
      dispatch(findCreatedItemsByAccount(filters));
    }
    if (navTab === NavTabs.ON_SALE) {
      dispatch(findOnSaleItemsByAccount(filters));
    }
  }, [dispatch, filters, navTab]);

  const hasMore = items.length < itemsCount;

  const handleNext = useCallback(() => {
    if (hasMore) {
      const newPage = Math.floor(items.length / filters.limit + 1);
      if (navTab === NavTabs.OWNED) {
        dispatch(findOwnedItemsByAccount({ ...filters, page: newPage }));
      }
      if (navTab === NavTabs.CREATED) {
        dispatch(findCreatedItemsByAccount({ ...filters, page: newPage }));
      }
      if (navTab === NavTabs.ON_SALE) {
        dispatch(findOnSaleItemsByAccount({ ...filters, page: newPage }));
      }
    }
  }, [hasMore, items.length, filters, navTab, dispatch]);

  const infiniteScrollSettings = {
    style: { overflow: 'inherit' },
    dataLength: items.length,
    handleNext,
    hasMore,
    loading: isPagingLoading,
    endMessageDisplay: 'Looking for more NFTs?',
    endMessageLink: '/create',
    endMessageLinkDetails: 'Create one!',
  };

  return (
    <div className="rn-authore-profile-area">
      <TabContainer defaultActiveKey={NavTabs.OWNED}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-wrapper-one">
                <nav className="tab-button-one">
                  <Nav className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Nav.Link
                      as="button"
                      eventKey={NavTabs.ON_SALE}
                      onClick={() => setNavTab(NavTabs.ON_SALE)}
                    >
                      On Sale
                    </Nav.Link>
                    <Nav.Link
                      as="button"
                      eventKey={NavTabs.OWNED}
                      onClick={() => setNavTab(NavTabs.OWNED)}
                    >
                      Owned
                    </Nav.Link>
                    <Nav.Link
                      as="button"
                      eventKey={NavTabs.CREATED}
                      onClick={() => setNavTab(NavTabs.CREATED)}
                    >
                      Created
                    </Nav.Link>
                    {!!likedItemsToShow.length && (
                      <Nav.Link
                        as="button"
                        eventKey={NavTabs.LIKED}
                        onClick={() => setNavTab(NavTabs.LIKED)}
                      >
                        Liked
                      </Nav.Link>
                    )}
                  </Nav>
                </nav>
              </div>
            </div>
          </div>

          <TabContent className="tab-content rn-bid-content">
            <TabPane className="row d-flex g-5" eventKey={navTab}>
              {navTab === NavTabs.LIKED ? (
                likedItemsToShow?.map((item: Item) => (
                  <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                    <ItemCard overlay item={item} />
                  </div>
                ))
              ) : (
                <InfiniteScroll infiniteScrollSettings={infiniteScrollSettings}>
                  <div className="rn-product-area rn-section-gapTop">
                    <div className="row g-5">
                      {items?.map((item: Item) => (
                        <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                          <ItemCard overlay item={item} />
                        </div>
                      ))}
                    </div>
                  </div>
                </InfiniteScroll>
              )}
            </TabPane>
          </TabContent>
        </div>
      </TabContainer>
    </div>
  );
};
