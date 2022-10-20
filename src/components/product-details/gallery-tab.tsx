import Image from 'next/image';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane';

type Props = {
  imageUrl: string;
  NFTName: string;
};

const GalleryTab = ({ imageUrl, NFTName }: Props) => (
  <div className="product-tab-wrapper">
    <TabContainer defaultActiveKey="nav-0">
      <div>
        {/* <Nav className="rn-pd-nav rn-pd-rt-content nav-pills">
          {images?.map((image: ImageType, index: number) => (
            <Nav.Link key={image.src} as="button" eventKey={`nav-${index}`}>
              <span className="rn-pd-sm-thumbnail">
                <Image src={image.src} alt={image?.alt || 'Product'} width={167} height={167} />
              </span>
            </Nav.Link>
          ))}
        </Nav> */}
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
