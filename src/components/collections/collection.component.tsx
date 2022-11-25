import Anchor from '@ui/anchor';
import Image from 'next/image';

type PropsType = {
  itemsQty: number;
  colTitle: string;
  colId: string;
};

const CollectionComponent = ({ itemsQty, colTitle, colId }: PropsType) => (
  <div className="rn-collection-inner-one">
    <div
      className="collection-wrapper"
      data-sal-delay="150"
      data-sal="slide-up"
      data-sal-duration="800"
    >
      <Anchor path={`/collections/${colId}`}>
        <div className="collection-big-thumbnail">
          <Image
            src="https://source.unsplash.com/random/1920x300"
            alt="Nft_Profile"
            width={507}
            height={339}
          />
        </div>

        <div className="collenction-small-thumbnail" style={{ gap: '10px' }}>
          <Image
            src="https://source.unsplash.com/random/1920x300"
            alt="Nft_Profile"
            width={164}
            height={110}
          />
          <Image
            src="https://source.unsplash.com/random/1920x300"
            alt="Nft_Profile"
            width={164}
            height={110}
          />
          <Image
            src="https://source.unsplash.com/random/1920x300"
            alt="Nft_Profile"
            width={164}
            height={110}
          />
        </div>

        <div className="collection-profile">
          <Image
            src="https://source.unsplash.com/random/1920x300"
            alt="Nft_Profile"
            width={80}
            height={80}
          />
        </div>

        <div className="collection-deg">
          <h6 className="title">{colTitle}</h6>
          <span className="items">{itemsQty} items</span>
        </div>
      </Anchor>
    </div>
  </div>
);

export default CollectionComponent;
