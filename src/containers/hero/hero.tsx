import { useEffect } from 'react';
import { ButtonContent, HomeSection, Item as ItemType } from '@types';
import Item from '@components/item';
import Button from '@ui/button';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';
import { getNewest } from '../../features/marketplace/store/marketplace.actions';
import { selectMarketplaceState } from '../../features/marketplace/store/marketplace.slice';

type Props = {
  homeSection?: HomeSection;
};

const Hero = ({ homeSection }: Props) => {
  const dispatch = useAppDispatch();
  const { newestItems, loadingNewest } = useAppSelector(selectMarketplaceState);
  const qtyItemsToFetch = 2;

  useEffect(() => {
    dispatch(getNewest(qtyItemsToFetch));
  }, [dispatch]);

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
                className="title"
                data-sal="slide-up"
                data-sal-delay={200}
                data-sal-duration={800}
                style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  lineHeight: '44px',
                  margin: '0 0 15px',
                }}
              >
                Search rare NFTs created by world class artists
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
            <SpinnerContainer isLoading={loadingNewest}>
              <div className="row g-5">
                {newestItems.map((item: ItemType) => (
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
            </SpinnerContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
