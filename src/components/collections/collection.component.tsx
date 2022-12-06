import Anchor from '@ui/anchor';
import { formattedAddress } from '@utils/getFormattedAddress';
import Image from 'next/image';

type PropsType = {
  itemsQty: number;
  colTitle: string;
  colId: string;
  ownerAddress: string;
  collectionBanner: string;
  collectionThumbnail?: string;
};

const CollectionComponent = ({
  itemsQty,
  colTitle,
  colId,
  ownerAddress,
  collectionBanner,
  collectionThumbnail,
}: PropsType) => (
  <div className="rn-collection-inner-one">
    <div className="collection-wrapper">
      <Anchor path={`/collections/${colId}`}>
        <div className="collection-big-thumbnail">
          <Image src={collectionBanner} alt="Nft_Profile" width={507} height={339} />
        </div>

        <div className="collection-profile mb-4">
          <Image src={String(collectionThumbnail)} alt="Nft_Profile" width={80} height={80} />
        </div>

        <div className="collection-deg" style={{ marginTop: '30px' }}>
          <h6 className="title">
            <b>{colTitle}</b>
            <span style={{ marginLeft: '2px', fontSize: '12px' }}>
              ({formattedAddress(ownerAddress)})
            </span>
          </h6>
          <span className="items">{itemsQty} items</span>
        </div>
      </Anchor>
    </div>
  </div>
);

export default CollectionComponent;
