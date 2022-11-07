import { Item, Property, Tag } from '@types';
import clsx from 'clsx';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Img2 from '../../../../public/images/brand/brand-01.png';
import Img3 from '../../../../public/images/brand/brand-02.png';
import Img4 from '../../../../public/images/brand/brand-03.png';
import BoyAvatar from '../../../../public/images/icons/boy-avater.png';
import { selectCanIList } from '../../../features/marketplace/store/marketplace.slice';
import useAppSelector from '../../../store/hooks/useAppSelector';
import DetailsTabContent from './details-tab-content';
import HistoryTabContent from './history-tab-content';
import { ListingTabContent } from './listing-tab-content';

type Props = {
  className?: string;
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
  const canIList = useAppSelector((state) => selectCanIList(state, item));
  const [selectedTab, setSelectedTab] = useState('nav-details' as string);

  return (
    /* DEFAULT  */
    <TabContainer
      defaultActiveKey="/nav-history"
      activeKey={selectedTab}
      onSelect={(selected) => setSelectedTab(String(selected))}
    >
      <div className={clsx('tab-wrapper-one', className)}>
        <nav className="tab-button-one">
          <Nav as="div" defaultActiveKey="/nav-history" className="nav-tabs">
            <Nav.Item>
              <Nav.Link as="button" eventKey="nav-details" href="/nav-details">
                Details
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="button" eventKey="nav-history" href="/nav-history">
                History
              </Nav.Link>
            </Nav.Item>
            {canIList && (
              <Nav.Item>
                <Nav.Link as="button" eventKey="nav-list" href="/nav-list">
                  List
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </nav>
        <TabContent className="rn-bid-content">
          <TabPane eventKey="nav-details">
            <DetailsTabContent owner={ownerHard} properties={propertiesHard} tags={tagsHard} />
          </TabPane>
          <TabPane eventKey="nav-history">
            <HistoryTabContent history={historyHard} />
          </TabPane>
          {canIList && (
            <TabPane eventKey="nav-list">
              <ListingTabContent item={item} setSelectedTab={setSelectedTab} />
            </TabPane>
          )}
        </TabContent>
      </div>
    </TabContainer>
  );
};
