import Slider, { SliderItem } from '@ui/slider';
import Product from '@components/item';

const SliderOptions = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
};

const ItemSliderComponent = () => (
  <div className="en-product-area">
    <div className="container">
      <div className="row mb--30">
        <div className="col-12">
          {/* <SectionTitle {...data.section_title} /> */}
          <h2>
            NFT&apos;s on <i>dogs collection</i>
          </h2>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <Slider
            options={SliderOptions}
            className="banner-one-slick slick-arrow-style-one rn-slick-dot-style slick-gutter-15"
          >
            <SliderItem>
              <Product
                itemId="1"
                overlay
                title="hello world"
                price={2.015}
                likeCount={20}
                imageString="https://source.unsplash.com/random/800x1000"
              />
            </SliderItem>
            <SliderItem>
              <Product
                itemId="1"
                overlay
                title="hello world"
                price={2.015}
                likeCount={20}
                imageString="https://source.unsplash.com/random/800x1000"
              />
            </SliderItem>
            <SliderItem>
              <Product
                itemId="1"
                overlay
                title="hello world"
                price={2.015}
                likeCount={20}
                imageString="https://source.unsplash.com/random/800x1000"
              />
            </SliderItem>
            <SliderItem>
              <Product
                itemId="1"
                overlay
                title="hello world"
                price={2.015}
                likeCount={20}
                imageString="https://source.unsplash.com/random/800x1000"
              />
            </SliderItem>
            <SliderItem>
              <Product
                itemId="1"
                overlay
                title="hello world"
                price={2.015}
                likeCount={20}
                imageString="https://source.unsplash.com/random/800x1000"
              />
            </SliderItem>
            <SliderItem>
              <Product
                itemId="1"
                overlay
                title="hello world"
                price={2.015}
                likeCount={20}
                imageString="https://source.unsplash.com/random/800x1000"
              />
            </SliderItem>
            <SliderItem>
              <Product
                itemId="1"
                overlay
                title="hello world"
                price={2.015}
                likeCount={20}
                imageString="https://source.unsplash.com/random/800x1000"
              />
            </SliderItem>
          </Slider>
        </div>
      </div>
    </div>
  </div>
);

export default ItemSliderComponent;
