import { Item as ItemType } from '@types';
import Item from '@components/item';
import Button from '@ui/button';
import { SpinnerContainer } from '@ui/spinner-container/spinner-container';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsCaretDownFill } from 'react-icons/bs';
import useAppSelector from '@store/hooks/useAppSelector';
import { selectNftState } from '../../features/leda-nft/store/leda-nft.slice';

const Hero = () => {
  const { items, isLoading } = useAppSelector(selectNftState);

  return (
    <div
      className="slider-one rn-section-gapTop"
      data-sal-delay="300"
      data-sal="slide-up"
      data-sal-duration="800"
    >
      <div className="container">
        <div className="row row-reverce-sm align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 mt_sm--50" style={{ padding: '10px' }}>
            <div className="banner-left-content slide-disc">
              <span
                className="title-badge sal-animate"
                data-sal="slide-up"
                data-sal-delay={150}
                data-sal-duration={800}
              >
                LEDA | NFT Marketplace
              </span>
              <h2
                className="title-s"
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
              <div className="d-flex" style={{ gap: '10px' }}>
                <Dropdown className="">
                  <Dropdown.Toggle
                    className="btn btn-large btn-primary"
                    variant="success"
                    bsPrefix="p-3"
                  >
                    Explore <BsCaretDownFill />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="explore-background" align="start">
                    <Link href="/marketplace">
                      <p className="explore-btn" style={{ marginBottom: '10px' }}>
                        <b>Marketplace</b>
                      </p>
                    </Link>
                    <Link href="/collections">
                      <p className="explore-btn">
                        <b>Collections</b>
                      </p>
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
                <Link href="/create">
                  <Button className="btn btn-large btn-primary-alta p-0">
                    <span>Create</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <SpinnerContainer isLoading={isLoading}>
              <div className="row g-5">
                {items.map((item: ItemType) => (
                  <div className="col-md-6" key={item.itemId}>
                    <Item
                      title={item.name}
                      itemId={item.itemId}
                      collectionId={item.collection.id}
                      owner={item.owner}
                      tokenId={item.tokenId}
                      price={Number(item.price)}
                      tags={item.tags}
                      status={item.status}
                      likeCount={item.likes}
                      imageString={item.image?.url}
                      isLazy={item.isLazy}
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
