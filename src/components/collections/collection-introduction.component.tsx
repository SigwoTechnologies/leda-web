import Image from 'next/image';

const CollectionIntroductionComponent = () => (
  <>
    <div className="rn-author-bg-area position-relative ptb--150">
      <Image
        src="https://source.unsplash.com/random/1920x300"
        alt="Slider BG"
        layout="fill"
        objectFit="cover"
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
                <div className="user-thumbnail">
                  <Image src="/images/avatars/2.png" width={140} height={140} layout="fixed" />
                </div>

                <div className="rn-author-info-content">
                  <h4 className="title">Dogs Collections</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default CollectionIntroductionComponent;
