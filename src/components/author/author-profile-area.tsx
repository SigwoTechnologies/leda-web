import { ItemCard } from '@components/ItemCard';
import { useMemo } from 'react';
import Nav from 'react-bootstrap/Nav';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import useAppSelector from '@store/hooks/useAppSelector';
import {
  selectCreatedItems,
  selectOnSaleItems,
  selectOwnedItems,
} from '../../features/auth/store/auth.slice';
import { Item } from '../../types/item';

export const AuthorProfileArea = () => {
  const {
    account: { address },
  } = useAppSelector((state) => state.auth);
  const createdItems = useAppSelector((state) => selectCreatedItems(state, address));
  const { likedItems } = useAppSelector((state) => state.marketplace);
  const onSaleItems = useAppSelector((state) => selectOnSaleItems(state, address));
  const ownedItems = useAppSelector((state) => selectOwnedItems(state, address));

  // TODO: Implement infinite scroll
  const likedItemsToShow = useMemo(
    () => likedItems.filter((item) => !item.isHidden || item.owner.address === address),
    [likedItems, address]
  );

  return (
    <div className="rn-authore-profile-area">
      <TabContainer defaultActiveKey="nav-profile">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-wrapper-one">
                <nav className="tab-button-one">
                  <Nav className="nav nav-tabs" id="nav-tab" role="tablist">
                    {!!onSaleItems.length && (
                      <Nav.Link as="button" eventKey="nav-home">
                        On Sale
                      </Nav.Link>
                    )}
                    {!!ownedItems.length && (
                      <Nav.Link as="button" eventKey="nav-profile">
                        Owned
                      </Nav.Link>
                    )}
                    {!!createdItems.length && (
                      <Nav.Link as="button" eventKey="nav-contact">
                        Created
                      </Nav.Link>
                    )}
                    {!!likedItemsToShow.length && (
                      <Nav.Link as="button" eventKey="nav-liked">
                        Liked
                      </Nav.Link>
                    )}
                  </Nav>
                </nav>
              </div>
            </div>
          </div>

          <TabContent className="tab-content rn-bid-content">
            {[
              { array: onSaleItems, eventKey: 'nav-home' },
              { array: ownedItems, eventKey: 'nav-profile' },
              { array: createdItems, eventKey: 'nav-contact' },
              { array: likedItemsToShow, eventKey: 'nav-liked' },
            ].map(({ array, eventKey }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TabPane className="row d-flex g-5" eventKey={eventKey} key={index}>
                {array?.map((item: Item) => (
                  <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                    <ItemCard overlay item={item} />
                  </div>
                ))}
              </TabPane>
            ))}
          </TabContent>
        </div>
      </TabContainer>
    </div>
  );
};
