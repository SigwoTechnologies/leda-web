import clsx from 'clsx';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import Product from '@components/item';
import { Item } from '@types';
import {
  selectCreatedItems,
  selectLikedItems,
  selectOnSaleItems,
  selectOwnedItems,
} from '../../features/account/store/account.slice';
import useAppSelector from '../../store/hooks/useAppSelector';

type Props = {
  className?: string;
  address: string;
};

const AuthorProfileArea = ({ className, address }: Props) => {
  const createdItems = useAppSelector((state) => selectCreatedItems(state, address));
  const likedItems = useAppSelector(selectLikedItems);
  const onSaleItems = useAppSelector((state) => selectOnSaleItems(state, address));
  const ownedItems = useAppSelector((state) => selectOwnedItems(state, address));

  return (
    <div className={clsx('rn-authore-profile-area', className)}>
      <TabContainer defaultActiveKey="nav-profile">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-wrapper-one">
                <nav className="tab-button-one">
                  <Nav className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Nav.Link as="button" eventKey="nav-home">
                      On Sale
                    </Nav.Link>
                    <Nav.Link as="button" eventKey="nav-profile">
                      Owned
                    </Nav.Link>
                    <Nav.Link as="button" eventKey="nav-contact">
                      Created
                    </Nav.Link>
                    <Nav.Link as="button" eventKey="nav-liked">
                      Liked
                    </Nav.Link>
                  </Nav>
                </nav>
              </div>
            </div>
          </div>

          <TabContent className="tab-content rn-bid-content">
            <TabPane className="row d-flex g-5" eventKey="nav-home">
              {onSaleItems?.map((item: Item) => (
                <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                  <Product
                    overlay
                    title={item.name}
                    itemId={item.itemId}
                    tokenId={item.tokenId}
                    price={Number(item.price)}
                    tags={item.tags}
                    status={item.status}
                    latestBid=""
                    likeCount={item.likes}
                    imageString={item.image.url}
                  />
                </div>
              ))}
            </TabPane>
            <TabPane className="row g-5 d-flex" eventKey="nav-profile">
              {ownedItems?.map((item: Item) => (
                <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                  <Product
                    overlay
                    title={item.name}
                    itemId={item.itemId}
                    tokenId={item.tokenId}
                    price={Number(item.price)}
                    tags={item.tags}
                    latestBid=""
                    status={item.status}
                    likeCount={item.likes}
                    imageString={item.image.url}
                  />
                </div>
              ))}
            </TabPane>
            <TabPane className="row g-5 d-flex" eventKey="nav-contact">
              {createdItems?.map((item: Item) => (
                <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                  <Product
                    overlay
                    title={item.name}
                    itemId={item.itemId}
                    tokenId={item.tokenId}
                    price={Number(item.price)}
                    tags={item.tags}
                    latestBid=""
                    likeCount={item.likes}
                    status={item.status}
                    imageString={item.image.url}
                  />
                </div>
              ))}
            </TabPane>
            <TabPane className="row g-5 d-flex" eventKey="nav-liked">
              {likedItems?.map((item: Item) => (
                <div key={item.itemId} className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                  <Product
                    overlay
                    title={item.name}
                    itemId={item.itemId}
                    tags={item.tags}
                    status={item.status}
                    tokenId={item.tokenId}
                    price={Number(item.price)}
                    latestBid=""
                    likeCount={item.likes}
                    imageString={item.image.url}
                  />
                </div>
              ))}
            </TabPane>
          </TabContent>
        </div>
      </TabContainer>
    </div>
  );
};

export default AuthorProfileArea;
