import Anchor from '@ui/anchor';
import Image from 'next/image';

type PropsType = {
  itemsQty: number;
  colTitle: string;
  colId: string;
  // ownerAddress: string;
};

const CollectionComponent = ({ itemsQty, colTitle, colId /* ownerAddress */ }: PropsType) => (
  <div className="rn-collection-inner-one">
    <div className="collection-wrapper">
      <Anchor path={`/collections/${colId}`}>
        <div className="collection-big-thumbnail">
          <Image
            src="https://source.unsplash.com/random/1920x300"
            alt="Nft_Profile"
            width={507}
            height={339}
          />
        </div>

        <div className="collection-profile mb-4">
          <Image
            src="https://source.unsplash.com/random/1920x300"
            alt="Nft_Profile"
            width={80}
            height={80}
          />
        </div>

        <div className="collection-deg" style={{ marginTop: '30px' }}>
          <h6 className="title">
            <b>{colTitle}</b>
            <span style={{ marginLeft: '2px', fontSize: '12px' }}>(0x815...x912)</span>
          </h6>
          <span className="items">{itemsQty} items</span>
        </div>
      </Anchor>
    </div>
  </div>
);

export default CollectionComponent;
