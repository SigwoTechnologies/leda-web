import { Author, Item, Property, Tag } from '@types';
import clsx from 'clsx';
import Nav from 'react-bootstrap/Nav';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Img2 from '../../../../public/images/brand/brand-01.png';
import Img3 from '../../../../public/images/brand/brand-02.png';
import Img4 from '../../../../public/images/brand/brand-03.png';
import BoyAvatar from '../../../../public/images/icons/boy-avater.png';
import useAppSelector from '../../../store/hooks/useAppSelector';
import DetailsTabContent from './details-tab-content';
import HistoryTabContent from './history-tab-content';
import { PriceTabContent } from './price-tab-content';

type Props = {
  className?: string;
  owner?: Author;
  item: Item;
};

// TODO: This code is hardcoded for demo purposes
// TODO: Once we start the production, this code
// ! MUST BE REMOVED AND REPLACED WITH THE DYNAMIC VERSION

const historyHard: any = [
  {
    id: 1,
    user: {
      name: 'Jhon Doe',
      slug: 'adg',
      image: {
        src: Img4,
      },
    },
    amount: '0.283',
    bidAt: '2 hours ago',
  },
  {
    id: 2,
    user: {
      name: 'Steve Jackson',
      slug: 'adg',
      image: {
        src: Img2,
      },
    },
    amount: '0.452',
    bidAt: '20 days ago',
  },
  {
    id: 3,
    user: {
      name: 'Jhon Doe',
      slug: 'adg',
      image: {
        src: Img3,
      },
    },
    amount: '0.817',
    bidAt: '1 year ago',
  },
  {
    id: 4,
    user: {
      name: 'Jhon Doe',
      slug: 'adg',
      image: {
        src: Img4,
      },
    },
    amount: '0.283',
    bidAt: '2 hours ago',
  },
  {
    id: 5,
    user: {
      name: 'Steve Jackson',
      slug: 'adg',
      image: {
        src: Img2,
      },
    },
    amount: '0.452',
    bidAt: '20 days ago',
  },
  {
    id: 6,
    user: {
      name: 'Jhon Doe',
      slug: 'adg',
      image: {
        src: Img3,
      },
    },
    amount: '0.817',
    bidAt: '1 year ago',
  },
];

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
  const { address } = useAppSelector((state) => state.auth);

  const isOwner: boolean = address === item?.owner.address;

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
            {isOwner && (
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
            <HistoryTabContent history={historyHard} />
          </TabPane>
          {isOwner && (
            <TabPane eventKey="nav-price">
              <PriceTabContent item={item} />
            </TabPane>
          )}
        </TabContent>
      </div>
    </TabContainer>
  );
};
