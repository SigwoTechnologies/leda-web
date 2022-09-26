import clsx from 'clsx';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import { Author, History, Property, Tag } from '@types';
import DetailsTabContent from './details-tab-content';
import HistoryTabContent from './history-tab-content';

type Props = {
  className?: string;
  owner: Author;
  properties: Property[];
  tags: Tag[];
  history: History[];
};

const BidTab = ({ className, owner, properties, tags, history }: Props) => (
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
        </Nav>
      </nav>
      <TabContent className="rn-bid-content">
        <TabPane eventKey="nav-profile">
          <DetailsTabContent owner={owner} properties={properties} tags={tags} />
        </TabPane>
        <TabPane eventKey="nav-contact">
          <HistoryTabContent history={history} />
        </TabPane>
      </TabContent>
    </div>
  </TabContainer>
);

export default BidTab;
