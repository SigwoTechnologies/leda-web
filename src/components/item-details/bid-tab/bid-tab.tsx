import { Item, Property, Tag } from '@types';
import clsx from 'clsx';
import Nav from 'react-bootstrap/Nav';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import BoyAvatar from '../../../../public/images/icons/boy-avater.png';
import { selectCanIList } from '../../../features/marketplace/store/marketplace.slice';
import useAppSelector from '../../../store/hooks/useAppSelector';
import DetailsTabContent from './details-tab-content';
import { HistoryTabContent } from './history-tab-content';
import { ListingTabContent } from './listing-tab-content';

type Props = {
  className?: string;
  item: Item;
};

const tagsHard: Tag[] = [
  {
    id: 1,
    type: 'ZARY',
    value: 'APP',
  },
  {
    id: 2,
    type: 'SOMALIAN',
    value: 'TRIBUTE',
  },
  {
    id: 3,
    type: 'TUNA',
    value: 'PIPE',
  },
  {
    id: 4,
    type: 'BID',
    value: 'BPEYti',
  },
  {
    id: 5,
    type: 'CITY',
    value: 'TOKYO',
  },
];

const propertiesHard: Property[] = [
  {
    id: 1,
    type: 'Hype Type',
    value: 'CALM AF (STILL)',
  },
  {
    id: 2,
    type: 'BASTARDNESS',
    value: 'C00LIO BASTARD',
  },
  {
    id: 3,
    type: 'TYPE',
    value: 'APE',
  },
  {
    id: 4,
    type: 'ASTARDNESS',
    value: 'BASTARD',
  },
  {
    id: 5,
    type: 'BID',
    value: 'BPEYti',
  },
];

const ownerHard: any = [
  {
    name: 'Jhon Slet',
    slug: 'h',
    image: {
      src: BoyAvatar,
    },
  },
];

export const BidTab = ({ className, item }: Props) => {
  const canIList = useAppSelector((state) => selectCanIList(state, item));

  return (
    <TabContainer defaultActiveKey="nav-profile">
      <div className={clsx('tab-wrapper-one', className)}>
        <nav className="tab-button-one">
          <Nav as="div" className="nav-tabs">
            <Nav.Link as="button" eventKey="nav-profile">
              Details
            </Nav.Link>
            <Nav.Link as="button" eventKey="nav-contact">
              History
            </Nav.Link>
            {canIList && (
              <Nav.Link as="button" eventKey="nav-price">
                List
              </Nav.Link>
            )}
          </Nav>
        </nav>
        <TabContent className="rn-bid-content">
          <TabPane eventKey="nav-profile">
            <DetailsTabContent owner={ownerHard} properties={propertiesHard} tags={tagsHard} />
          </TabPane>
          <TabPane eventKey="nav-contact">
            <HistoryTabContent item={item} />
          </TabPane>
          {canIList && (
            <TabPane eventKey="nav-price">
              <ListingTabContent item={item} />
            </TabPane>
          )}
        </TabContent>
      </div>
    </TabContainer>
  );
};
