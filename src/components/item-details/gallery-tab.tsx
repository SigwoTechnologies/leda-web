import Image from 'next/image';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';

type Props = {
  imageUrl: string;
  NFTName: string;
};

const GalleryTab = ({ imageUrl, NFTName }: Props) => (
  <div className="product-tab-wrapper">
    <TabContainer defaultActiveKey="nav-0">
      <div>
        <TabContent className="rn-pd-content rounded">
          <span>
            <Image
              src={imageUrl}
              alt={`${NFTName} NFT - Leda NFTs Marketplace`}
              style={{ borderRadius: '20px' }}
              width={740}
              height={560}
            />
          </span>
        </TabContent>
      </div>
    </TabContainer>
  </div>
);

export default GalleryTab;
