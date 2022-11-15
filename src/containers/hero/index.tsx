import Button from '@ui/button';
import { ButtonContent, HomeSection, Item as ItemType } from '@types';
import Item from '@components/item';
import useAppSelector from '../../store/hooks/useAppSelector';
import { selectNewest } from '../../features/leda-nft/store/leda-nft.slice';

type Props = {
  homeSection?: HomeSection;
};

const HeroArea = ({ homeSection }: Props) => {
  const newItems = useAppSelector(selectNewest);
  return (
    <div className="slider-one rn-section-gapTop">
      <div className="container">
        <div className="row row-reverce-sm align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 mt_sm--50">
            <div
              className="banner-left-content slide-disc"
              data-sal-delay="300"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              <span
                className="title-badge sal-animate"
                data-sal="slide-up"
                data-sal-delay={150}
                data-sal-duration={800}
              >
                LEDA | NFT Marketplace
              </span>
              <h2
                className="title-hero"
                data-sal="slide-up"
                data-sal-delay={200}
                data-sal-duration={800}
              >
                Search your rare NFTs by world <br /> class artists
              </h2>
              <p
                className="banner-disc-one sal-animate"
                data-sal="slide-up"
                data-sal-delay={250}
                data-sal-duration={800}
              >
                Where Bitcoin was hailed as the digital answer to currency, NFTs <br /> are now
                being touted as the digital answer to collectables.
              </p>
              {homeSection?.buttons && (
                <div className="button-group">
                  {homeSection.buttons.map(({ content, id, ...btn }: ButtonContent) => (
                    <Button {...btn} key={id}>
                      {content}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row g-5">
              {newItems.slice(0, 2).map((item: ItemType) => (
                <div className="col-md-6" key={item.itemId}>
                  <Item
                    title={item.name}
                    itemId={item.itemId}
                    owner={item.owner}
                    tokenId={item.tokenId}
                    price={Number(item.price)}
                    tags={item.tags}
                    status={item.status}
                    likeCount={item.likes}
                    imageString={item.image.url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
