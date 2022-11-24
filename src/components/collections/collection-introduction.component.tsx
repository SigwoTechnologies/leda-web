import Image from 'next/image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { selectCurrentSelection } from '../../features/collections/store/collections.slice';
import useAppSelector from '../../store/hooks/useAppSelector';
import { formattedAddress } from '../../utils/getFormattedAddress';

const CollectionIntroductionComponent = () => {
  const collection = useAppSelector(selectCurrentSelection);

  const lastUpdateDate = new Date(collection.updatedAt).toLocaleDateString();

  return (
    <>
      <div className="rn-author-bg-area position-relative ptb--150 mt-2">
        <Image
          src="https://source.unsplash.com/random/1920x300"
          alt="Slider BG"
          layout="fill"
          objectFit="cover"
          className="collection-banner-image"
          quality={100}
          priority
        />
      </div>
      <div className="rn-author-area mb--30 mt_dec--120">
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-12">
              <div className="author-wrapper" style={{ justifyContent: 'start' }}>
                <div className="author-inner">
                  <div className="user-thumbnail" style={{ margin: 'initial' }}>
                    <Image
                      src={collection.items[0].image.url}
                      width={140}
                      alt={collection.name}
                      height={140}
                      layout="fixed"
                    />
                  </div>

                  <div className="rn-author-info-content" style={{ textAlign: 'left' }}>
                    <h2 className="title">{collection.name}</h2>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-right">
                          <span style={{ fontSize: '14px' }}>Last update: {lastUpdateDate}</span>
                        </Tooltip>
                      }
                    >
                      <span>
                        Owned By{' '}
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>
                          {formattedAddress(collection.owner.address)}
                        </span>
                      </span>
                    </OverlayTrigger>
                    <p className="mt-3">{collection.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionIntroductionComponent;
