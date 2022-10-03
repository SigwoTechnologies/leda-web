import Image from 'next/image';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import { Image as ImageType } from '@types';

type Props = {
  images: ImageType[];
};

const GalleryTab = ({ images }: Props) => (
  <div className="product-tab-wrapper">
    <TabContainer defaultActiveKey="nav-0">
      <div className="pd-tab-inner">
        <Nav className="rn-pd-nav rn-pd-rt-content nav-pills">
          {images?.map((image: ImageType, index: number) => (
            <Nav.Link key={image.src} as="button" eventKey={`nav-${index}`}>
              <span className="rn-pd-sm-thumbnail">
                <Image src={image.src} alt={image?.alt || 'Product'} width={167} height={167} />
              </span>
            </Nav.Link>
          ))}
        </Nav>
        <TabContent className="rn-pd-content">
          {images?.map((image: ImageType, index: number) => (
            <TabPane key={image.src} eventKey={`nav-${index}`}>
              <div className="rn-pd-thumbnail">
                <Image src={image.src} alt={image?.alt || 'Product'} width={560} height={560} />
              </div>
            </TabPane>
          ))}
        </TabContent>
      </div>
    </TabContainer>
  </div>
);

export default GalleryTab;